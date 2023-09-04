<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    public const IMAGE_UPLOAD_PATH = 'images/uploads/sub_category/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/sub_category_thumb/';
    use HasFactory;
    protected $fillable = ['name','category_id','slug','serial','status','description','photo','user_id'];

    public function storeSubCategory(array $input)
    {
        self::query()->create($input);
    }

    public function getAllSubCategories(array $input)
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();
        if(!empty($input['search'])){
            $query->where('name','like','%'.$input['search'].'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'],$input['dirrection'] ?? 'asc');
        }

       return $query->with(['user:id,name','category:id,name'])->paginate($per_page);
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function category() 
    {
        return $this->belongsTo(Category::class);
    }

    public function getSubCategoryIdName ($category_id){
        return self::query()->select('id','name')->where('category_id',$category_id)->get();
    }


}
