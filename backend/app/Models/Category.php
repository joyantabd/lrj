<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public const IMAGE_UPLOAD_PATH = 'images/uploads/category/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/category_thumb/';
    use HasFactory;
    public const STATUS_ACTIVE = 1;
    protected $fillable = ['name','slug','serial','status','description','photo','user_id'];


    public function storeCategory(array $input)
    {
        self::query()->create($input);
    }


    public function getAllCategories(array $input)
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();
        if(!empty($input['search'])){
            $query->where('name','like','%'.$input['search'].'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'],$input['dirrection'] ?? 'asc');
        }

       return $query->with('user:id,name')->paginate($per_page);
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function getCategoryIdName (){
        return self::query()->select('id','name')->where('status',self::STATUS_ACTIVE)->get();
    }
}
