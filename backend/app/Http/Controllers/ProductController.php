<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductBarCodeResource;
use App\Http\Resources\ProductList;
use App\Models\ProductAttribute;
use App\Models\ProductSpecification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       $products = (new Product())->getData($request->all());
       return ProductList::collection($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function product_barcode(Request $request)
    {
       $products = (new Product())->getProductBarcode($request->all());
       return ProductBarCodeResource::collection($products);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
    

        try
        {
        DB::beginTransaction();
        $product = (new Product())->StoreProduct($request->all());

        if($request->has('attributes')){
            (new ProductAttribute())->StoreData($request->input('attributes'),$product);
        }
        if($request->has('specifications')){
            (new ProductSpecification())->StoreData($request->input('specifications'),$product);
        }
        DB::commit();
        return response()->json(['msg'=>'Insered Successfully','cls'=>'success','product_id'=> $product->id]);

        }
        catch(\Throwable $e)
        {
            info('PRODUCT_SAVE_FAILED',['data'=>$request->all(),'error'=>$e->getMessage()]);
            DB::rollBack();
            return response()->json(['msg'=>$e->getMessage(),'cls'=>'warning']);
        }
         

       
        

    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
