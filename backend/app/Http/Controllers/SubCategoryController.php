<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Http\Resources\SubCategoryEditResource;
use App\Http\Resources\SubCategoryResource;
use App\Manager\ImageManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = (new SubCategory())->getAllSubCategories($request->all());
        return SubCategoryResource::collection($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    public function getSubCategory($category_id){
        $subcategories = (new SubCategory())->getSubCategoryIdName($category_id);
        return response()->json($subcategories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubCategoryRequest $request)
    {
        $sub_category = $request->except('photo');
        $sub_category['slug'] = Str::slug($request->input('slug'));
        $sub_category['user_id'] = Auth::user()->id;
        if($request->has('photo'))
        {
            $file = $request->input('photo');
            $sub_category['photo'] = $this->processImageUpload($file,$sub_category['slug']);
        }
        (new SubCategory())->storeSubCategory($sub_category);
        return response()->json(['msg'=>'Insered Successfully','cls'=>'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(SubCategory $subCategory)
    {
        return new SubCategoryEditResource($subCategory);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubCategory $subCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubCategoryRequest $request, SubCategory $subCategory)
    {
        $data = $request->except('photo');
        $data['slug'] = Str::slug($request->input('slug'));
    
        if($request->has('photo'))
        {
            $file = $request->input('photo');
            $data['photo'] = $this->processImageUpload($file,$data['slug'],$subCategory->photo);
        }
        $subCategory->update($data);
        return response()->json(['msg'=>'Updated Successfully','cls'=>'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCategory $subCategory)
    {

        if(!empty($subCategory))
        {
            ImageManager::deletePhoto(SubCategory::IMAGE_UPLOAD_PATH,$subCategory->photo);
            ImageManager::deletePhoto(SubCategory::THUMB_IMAGE_UPLOAD_PATH,$subCategory->photo);
        }
        $subCategory->delete();
        return response()->json(['msg'=>'Deteleted Successfully','cls'=>'warning']);
    }


    private function processImageUpload($file, $name, $existing_photo = null)
    {
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        $path = SubCategory::IMAGE_UPLOAD_PATH;
        $path_thumb = SubCategory::THUMB_IMAGE_UPLOAD_PATH;

        if(!empty($existing_photo)){
        ImageManager::deletePhoto(SubCategory::IMAGE_UPLOAD_PATH,$existing_photo);
        ImageManager::deletePhoto(SubCategory::THUMB_IMAGE_UPLOAD_PATH,$existing_photo); 
         }

    $photo_name = ImageManager::uploadImage($name,$width,$height,$path,$file);
                ImageManager::uploadImage($name,$width_thumb,$height_thumb,$path_thumb,$file);

    return $photo_name;
    }
}
