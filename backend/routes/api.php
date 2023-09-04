<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\AttributeValueController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductPhotoController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SalesManagerController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\SupplierController;
use App\Manager\ScriptManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('test',[ScriptManager::class,'getLocationData']);
Route::get('country',[ScriptManager::class,'getCountry']);

Route::get('division_info',[DivisionController::class,'index']);
Route::get('district_info/{id}',[DistrictController::class,'index']);
Route::get('area_info/{id}',[AreaController::class,'index']);


Route::post('login',[AuthController::class,'login']);

Route::group(['middleware' => ['auth:admin']], static function() {
    Route::post('logout',[AuthController::class,'logout']);
    Route::get('brand_info',[BrandController::class,'getBrands']);
    Route::get('country_info',[CountryController::class,'getCountry']);
    Route::get('supplier_info',[SupplierController::class,'getSupplier']);
    Route::get('attribute_info',[AttributeController::class,'getAttribute']);
    Route::get('shop_info',[ShopController::class,'getShop']);
    Route::post('product_photo_upload/{id}',[ProductPhotoController::class,'store']);
    Route::apiResource('category',CategoryController::class);
    Route::apiResource('sub_category',SubCategoryController::class);
    Route::apiResource('brands',BrandController::class);
    Route::apiResource('supplier',SupplierController::class);
    Route::apiResource('attribute',AttributeController::class);
    Route::apiResource('value',AttributeValueController::class);
    Route::apiResource('product',ProductController::class);
    Route::apiResource('photo',ProductPhotoController::class);
    Route::apiResource('shop',ShopController::class);
    Route::apiResource('sales_manager',SalesManagerController::class);

});


Route::group(['middleware' => ['auth:admin,sales_manager']], function() {
    Route::get('category_info',[CategoryController::class,'getCategory']);
    Route::get('sub_category_info/{category_id}',[SubCategoryController::class,'getSubCategory']);
    Route::get('product_barcode',[ProductController::class,'product_barcode']);
    Route::apiResource('report',ReportController::class);

    Route::apiResource('product',ProductController::class)->only('index','show');
    Route::apiResource('customer',CustomerController::class);
    Route::apiResource('order',OrderController::class);
    Route::apiResource('paymentmethods',PaymentMethodController::class);
    Route::get('get_payment_methods',[PaymentMethodController::class,'getPaymentMethods']);
});

// Route::group(['middleware' => ['auth:sales_manager']], function() {
//     Route::apiResource('product',ProductController::class)->only('index','show');
//     Route::apiResource('customer',CustomerController::class);
// });