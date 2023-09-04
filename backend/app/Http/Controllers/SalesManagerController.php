<?php

namespace App\Http\Controllers;

use App\Models\SalesManager;
use App\Http\Requests\StoreSalesManagerRequest;
use App\Http\Requests\UpdateSalesManagerRequest;
use App\Http\Resources\SalesManagerEditResource;
use App\Http\Resources\SalesManagerList;
use App\Manager\ImageManager;
use App\Models\Address;
use App\Models\Shop;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesManagerController extends Controller
{
    public function index(Request $request)
    {
        $data = (new SalesManager())->getData($request->all());
        return SalesManagerList::collection($data);

    }

    public function getShop(){
        $data = (new SalesManager())->getDataIdName();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSalesManagerRequest $request)
    {
        $sales = (new SalesManager())->prepareData($request->all());
        $address = (new Address())->prepareData($request->all());


        if($request->has('photo')){
        $name = Str::slug($sales['name']);
        $file = $request->input('photo');
        $sales['photo'] = ImageManager::processImageUpload($file,$name,
        SalesManager::IMAGE_UPLOAD_PATH,SalesManager::PHOTO_WIDTH,SalesManager::PHOTO_HEIGHT,
        SalesManager::THUMB_IMAGE_UPLOAD_PATH,SalesManager::PHOTO_THUMB_WIDTH,SalesManager::PHOTO_THUMB_HEIGHT);
        }

        if($request->has('nid_photo')){
            $name = Str::slug($sales['name']. '- nid');
            $file = $request->input('nid_photo');
            $sales['nid_photo'] = ImageManager::processImageUpload($file,$name,
            SalesManager::IMAGE_UPLOAD_PATH,SalesManager::PHOTO_WIDTH,SalesManager::PHOTO_HEIGHT,
            SalesManager::THUMB_IMAGE_UPLOAD_PATH,SalesManager::PHOTO_THUMB_WIDTH,SalesManager::PHOTO_THUMB_HEIGHT);
            }


        try{
            DB::beginTransaction();
            $sales = SalesManager::create($sales);
            $sales->address()->create($address);
            DB::commit();
            return response()->json(['msg'=>'Insered Successfully','cls'=>'success']);
        }catch(\Throwable $e){
            if(isset($sales['photo'])){
                ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH,$sales['photo']);
                ImageManager::deletePhoto(SalesManager::THUMB_IMAGE_UPLOAD_PATH,$sales['photo']);
            }

            if(isset($sales['nid_photo'])){
                ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH,$sales['nid_photo']);
                ImageManager::deletePhoto(SalesManager::THUMB_IMAGE_UPLOAD_PATH,$sales['nid_photo']);
            }
            
            info('SHOP_STORE_ERROR',[$sales,$address,$e]);
            DB::rollBack();
            return response()->json(['msg'=>'Something Went Wrong','cls'=>'warning','flag'=>'true']);

        }

       
       
    }


    /**
     * Display the specified resource.
     */
    public function show(SalesManager $salesManager)
    {
        $salesManager->load('address');
        return new SalesManagerEditResource($salesManager);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shop $shop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalesManagerRequest $request, SalesManager $salesManager)
    {
        $data = (new SalesManager())->UpdateData($request->all());
        $address_data = (new Address())->prepareData($request->all());


        if($request->has('photo')){
        $name = Str::slug($data['name']);
        $file = $request->input('photo');
        $data['photo'] = ImageManager::processImageUpload($file,$name,
        SalesManager::IMAGE_UPLOAD_PATH,SalesManager::PHOTO_WIDTH,SalesManager::PHOTO_HEIGHT,
        SalesManager::THUMB_IMAGE_UPLOAD_PATH,SalesManager::PHOTO_THUMB_WIDTH,SalesManager::PHOTO_THUMB_HEIGHT,
        $salesManager->photo);
        }

        if($request->has('nid_photo')){
            $name = Str::slug($data['name']. '- nid');
            $file = $request->input('nid_photo');
            $data['nid_photo'] = ImageManager::processImageUpload($file,$name,
            SalesManager::IMAGE_UPLOAD_PATH,SalesManager::PHOTO_WIDTH,SalesManager::PHOTO_HEIGHT,
            SalesManager::THUMB_IMAGE_UPLOAD_PATH,SalesManager::PHOTO_THUMB_WIDTH,SalesManager::PHOTO_THUMB_HEIGHT,
            $salesManager->nid_photo);
        }


        try{
            DB::beginTransaction();
            $data = $salesManager->update($data);
            $salesManager->address()->update($address_data);
            DB::commit();
            return response()->json(['msg'=>'Updated Successfully','cls'=>'success']);
        }catch(\Throwable $e){
            info('SalesManager_Update_ERROR',[$data,$address_data,$e]);
            DB::rollBack();
            return response()->json(['msg'=>'Something Went Wrong','cls'=>'warning','flag'=>'true']);
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SalesManager $salesManager)
    {
        if(!empty($salesManager))
        {
            ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH,$salesManager->photo);
            ImageManager::deletePhoto(SalesManager::THUMB_IMAGE_UPLOAD_PATH,$salesManager->photo);
            ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH,$salesManager->nid_photo);
            ImageManager::deletePhoto(SalesManager::THUMB_IMAGE_UPLOAD_PATH,$salesManager->nid_photo);
        }
        (new Address())->deleteAddressBySupplierId($salesManager);
        $salesManager->delete();
        return response()->json(['msg'=>'Deteleted Successfully','cls'=>'warning']);
    }
  
}
