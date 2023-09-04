<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierEditResource;
use App\Http\Resources\SupplierResource;
use App\Manager\ImageManager;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $suppliers = (new Supplier())->getSuppliers($request->all());
        return SupplierResource::collection($suppliers);

    }

    public function getSupplier(){
        $sppliers = (new Supplier())->getDataIdName();
        return response()->json($sppliers);
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
    public function store(StoreSupplierRequest $request)
    {
        $supplier = (new Supplier())->prepareData($request->all());
        $address = (new Address())->prepareData($request->all());


        if($request->has('photo'))
        {
        $name = Str::slug($supplier['name']);
        $file = $request->input('photo');
        $supplier['photo'] = ImageManager::processImageUpload($file,$name,
        Supplier::IMAGE_UPLOAD_PATH,Supplier::PHOTO_WIDTH,Supplier::PHOTO_HEIGHT,
        Supplier::THUMB_IMAGE_UPLOAD_PATH,Supplier::PHOTO_THUMB_WIDTH,Supplier::PHOTO_THUMB_HEIGHT);
        }


        try{
            DB::beginTransaction();
            $supplier = Supplier::create($supplier);
            $supplier->address()->create($address);
            DB::commit();
            return response()->json(['msg'=>'Insered Successfully','cls'=>'success']);
        }catch(\Throwable $e){
            if(isset($supplier['photo']))
            {
                ImageManager::deletePhoto(Supplier::IMAGE_UPLOAD_PATH,$supplier['photo']);
                ImageManager::deletePhoto(Supplier::THUMB_IMAGE_UPLOAD_PATH,$supplier['photo']);
            }
            
            info('SUPPLIER_STORE_ERROR',[$supplier,$address,$e]);
            DB::rollBack();
            return response()->json(['msg'=>'Something Went Wrong','cls'=>'warning','flag'=>'true']);

        }

       
       
    }


    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        $supplier->load('address');
        return new SupplierEditResource($supplier);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        $supplier_data = (new Supplier())->prepareData($request->all());
        $address_data = (new Address())->prepareData($request->all());


        if($request->has('photo'))
        {
        $name = Str::slug($supplier_data['name']);
        $file = $request->input('photo');
        $supplier_data['photo'] = ImageManager::processImageUpload($file,$name,
        Supplier::IMAGE_UPLOAD_PATH,Supplier::PHOTO_WIDTH,Supplier::PHOTO_HEIGHT,
        Supplier::THUMB_IMAGE_UPLOAD_PATH,Supplier::PHOTO_THUMB_WIDTH,Supplier::PHOTO_THUMB_HEIGHT,
        $supplier->photo);
        }


        try{
            DB::beginTransaction();
            $supplier_data = $supplier->update($supplier_data);
            $supplier->address()->update($address_data);
            DB::commit();
            return response()->json(['msg'=>'Updated Successfully','cls'=>'success']);
        }catch(\Throwable $e){
            info('SUPPLIER_ERROR',[$supplier_data,$address_data,$e]);
            DB::rollBack();
            return response()->json(['msg'=>'Something Went Wrong','cls'=>'warning','flag'=>'true']);
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        if(!empty($supplier))
        {
            ImageManager::deletePhoto(Supplier::IMAGE_UPLOAD_PATH,$supplier->photo);
            ImageManager::deletePhoto(Supplier::THUMB_IMAGE_UPLOAD_PATH,$supplier->photo);
        }
        (new Address())->deleteAddressBySupplierId($supplier);
        $supplier->delete();
        return response()->json(['msg'=>'Deteleted Successfully','cls'=>'warning']);
    }
  
}
