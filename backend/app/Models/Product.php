<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use DB;

class Product extends Model
{
    use HasFactory;
    public const STATUS_ACTIVE = 1;
    public const STATUS_INACTIVE = 0;
    protected $fillable = ['name', 'price','slug','sku','status','cost','stock', 'description','discount_end','discount_fixed','discount_percent','discount_start',
     'category_id', 'brand_id', 'country_id',  'sub_category_id', 'supplier_id',
     'created_by','updated_by'];

    public function StoreProduct($input)
    {
        return self::create($this->PrepareDate($input));
    }

    public function getProductBarcode($input)
    {
        $query= self::query()->select('id','name','sku','price','discount_end','discount_start','discount_fixed','discount_percent');
        if(!empty($input['name'])){
            $query->where('name','like','%'.$input['name'].'%');
        }
        if(!empty($input['category_id'])){
            $query->where('category_id','like','%'.$input['category_id'].'%');
        }
        if(!empty($input['sub_category_id'])){
            $query->where('sub_category_id','like','%'.$input['sub_category_id'].'%');
        }
        return $query->get();
    }

    public function getProductById($id)
    {
       return self::query()->with('primary_photo')->findOrFail($id);
    }

    public function getData($input)
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with([
            'category:id,name',
            'sub_category:id,name',
            'brand:id,name',
            'country:id,name',
            'supplier:id,name,phone',
            'creator:id,name',
            'updator:id,name',
            'primary_photo',
            'product_attributes',
            'product_attributes.attributes',
            'product_attributes.attribute_values'
        ]);
        if(!empty($input['search'])){
            $query->where('name','like','%'.$input['search'].'%')
                   ->orwhere('sku','like','%'.$input['search'].'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'],$input['dirrection'] ?? 'asc');
        }

       return $query->paginate($per_page);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function sub_category()
    {
        return $this->belongsTo(SubCategory::class,'sub_category_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class,'brand_id');
    }

    public function country()
    {
        return $this->belongsTo(Country::class,'country_id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class,'supplier_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class,'created_by');
    }

    public function updator()
    {
        return $this->belongsTo(User::class,'updated_by');
    }

    public function primary_photo()
    {
        return $this->hasOne(ProductPhoto::class)->where('is_primary',1);
    }

    public function product_attributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    private function PrepareDate($input)
    {

      return [
        'brand_id' => $input['brand_id'] ?? 0,
        'category_id' =>$input['category_id'] ?? 0,
        'country_id' => $input['country_id'] ?? 0,
        'sub_category_id' => $input['sub_category_id'] ?? 0,
        'supplier_id' => $input['supplier_id'] ?? 0,

        'name' => $input['name'] ?? '',
        'price' => $input['price'] ?? 0,
        'sku' => $input['sku'] ?? '',
        'slug' => $input['slug'] ? Str::slug($input['slug']) : '',
        'status' => $input['status'] ?? 0,
        'cost' => $input['cost'] ?? 0,
        'stock' => $input['stock'] ?? 0,
        'description' => $input['description'] ?? '',
        'discount_end' => $input['discount_end'] ?? null,
        'discount_fixed' => $input['discount_fixed'] ?? 0,
        'discount_percent' => $input['discount_percent'] ?? 0,
        'discount_start' => $input['discount_start'] ?? null,
        
       
        'created_by' => Auth::user()->id,
        'updated_by' => Auth::user()->id,

        'specifications' => 'array',
        'attributes' => 'array'
        ];

    }


    public function getAllProduct($columns = ['*'])
    {
    $products = DB::table('products')->select($columns)->get();
    return collect($products);

    }
}
