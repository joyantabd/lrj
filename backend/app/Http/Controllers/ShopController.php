<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Http\Requests\StoreShopRequest;
use App\Http\Requests\UpdateShopRequest;
use App\Http\Resources\ShopEditResource;
use App\Http\Resources\ShopResource;
use App\Manager\ImageManager;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = (new Shop())->getData($request->all());
        return ShopResource::collection($data);

    }

    public function getShop(){
        $data = (new Shop())->getDataIdName();
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
    public function store(StoreShopRequest $request)
    {
        $shop = (new Shop())->prepareData($request->all());
        $address = (new Address())->prepareData($request->all());


        if($request->has('photo'))
        {
        $name = Str::slug($shop['name']);
        $file = $request->input('photo');
        $shop['photo'] = ImageManager::processImageUpload($file,$name,
        Shop::IMAGE_UPLOAD_PATH,Shop::PHOTO_WIDTH,Shop::PHOTO_HEIGHT,
        Shop::THUMB_IMAGE_UPLOAD_PATH,Shop::PHOTO_THUMB_WIDTH,Shop::PHOTO_THUMB_HEIGHT);
        }


        try{
            DB::beginTransaction();
            $shop = Shop::create($shop);
            $shop->address()->create($address);
            DB::commit();
            return response()->json(['msg'=>'Insered Successfully','cls'=>'success']);
        }catch(\Throwable $e){
            if(isset($shop['photo']))
            {
                ImageManager::deletePhoto(Shop::IMAGE_UPLOAD_PATH,$shop['photo']);
                ImageManager::deletePhoto(Shop::THUMB_IMAGE_UPLOAD_PATH,$shop['photo']);
            }
            
            info('SHOP_STORE_ERROR',[$shop,$address,$e]);
            DB::rollBack();
            return response()->json(['msg'=>'Something Went Wrong','cls'=>'warning','flag'=>'true']);

        }

       
       
    }


    /**
     * Display the specified resource.
     */
    public function show(Shop $shop)
    {
        $shop->load('address');
        return new ShopEditResource($shop);
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
    public function update(UpdateShopRequest $request, Shop $shop)
    {
        $shop_data = (new Shop())->prepareData($request->all());
        $address_data = (new Address())->prepareData($request->all());


        if($request->has('photo'))
        {
        $name = Str::slug($shop_data['name']);
        $file = $request->input('photo');
        $shop_data['photo'] = ImageManager::processImageUpload($file,$name,
        Shop::IMAGE_UPLOAD_PATH,Shop::PHOTO_WIDTH,Shop::PHOTO_HEIGHT,
        Shop::THUMB_IMAGE_UPLOAD_PATH,Shop::PHOTO_THUMB_WIDTH,Shop::PHOTO_THUMB_HEIGHT,
        $shop->photo);
        }


        try{
            DB::beginTransaction();
            $shop_data = $shop->update($shop_data);
            $shop->address()->update($address_data);
            DB::commit();
            return response()->json(['msg'=>'Updated Successfully','cls'=>'success']);
        }catch(\Throwable $e){
            info('SUPPLIER_ERROR',[$shop_data,$address_data,$e]);
            DB::rollBack();
            return response()->json(['msg'=>'Something Went Wrong','cls'=>'warning','flag'=>'true']);
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {
        if(!empty($shop))
        {
            ImageManager::deletePhoto(Shop::IMAGE_UPLOAD_PATH,$shop->photo);
            ImageManager::deletePhoto(Shop::THUMB_IMAGE_UPLOAD_PATH,$shop->photo);
        }
        (new Address())->deleteAddressBySupplierId($shop);
        $shop->delete();
        return response()->json(['msg'=>'Deteleted Successfully','cls'=>'warning']);
    }
  
}
