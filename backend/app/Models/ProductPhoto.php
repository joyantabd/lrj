<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPhoto extends Model
{
    use HasFactory;
    protected $fillable = ['product_id','photo','is_primary'];
    const STATUS_ACTIVE = 1;
    const STATUS_ACTIVE_TEXT = 'Active';
    const STATUS_INACTIVE = 0;
    const STATUS_INACTIVE_TEXT = 'Inactive';
    const PHOTO_WIDTH = 800;
    const PHOTO_HEIGHT = 800;
    const PHOTO_THUMB_WIDTH = 150;
    const PHOTO_THUMB_HEIGHT = 150;
    const IMAGE_UPLOAD_PATH = 'images/uploads/product_photo/';
    const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/product_photo_thumb/';


}
