<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandEditResource;
use App\Http\Resources\BrandResource;
use App\Manager\ImageManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $brands = (new Brand())->getAllDatas($request->all());
        return BrandResource::collection($brands);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

     public function getBrands(){
        $brands = (new Brand())->getDataIdName();
        return response()->json($brands);
     }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        $data = $request->except('photo');
        $data['slug'] = Str::slug($request->input('slug'));
        $data['user_id'] = Auth::user()->id;
        if($request->has('photo'))
        {
            $file = $request->input('photo');
            $data['photo'] =$this->processImageUpload($file,$data['slug']);
        }
        (new Brand())->storeBrand($data);
        return response()->json(['msg'=>'Insered Successfully','cls'=>'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return new BrandEditResource($brand);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $data = $request->except('photo');
        $data['slug'] = Str::slug($request->input('slug'));
    
        if($request->has('photo'))
        {
            $file = $request->input('photo');
            $data['photo'] = $this->processImageUpload($file,$data['slug'],$brand->photo);
        }
        $brand->update($data);
        return response()->json(['msg'=>'Updated Successfully','cls'=>'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        if(!empty($brand))
        {
            ImageManager::deletePhoto(Brand::IMAGE_UPLOAD_PATH,$brand->photo);
            ImageManager::deletePhoto(Brand::THUMB_IMAGE_UPLOAD_PATH,$brand->photo);
        }
        $brand->delete();
        return response()->json(['msg'=>'Deteleted Successfully','cls'=>'warning']);
    }

    private function processImageUpload($file, $name, $existing_photo = null)
    {
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        $path = Brand::IMAGE_UPLOAD_PATH;
        $path_thumb = Brand::THUMB_IMAGE_UPLOAD_PATH;

        if(!empty($existing_photo)){
        ImageManager::deletePhoto(Brand::IMAGE_UPLOAD_PATH,$existing_photo);
        ImageManager::deletePhoto(Brand::THUMB_IMAGE_UPLOAD_PATH,$existing_photo); 
         }

        $photo_name = ImageManager::uploadImage($name,$width,$height,$path,$file);
                ImageManager::uploadImage($name,$width_thumb,$height_thumb,$path_thumb,$file);

    return $photo_name;
    }
}
