<?php

namespace App\Manager;
use Intervention\Image\Facades\Image;

class ImageManager{


   public const DEFAULT_IMAGE = '/images/default.webp';

   public static function uploadImage(string $name, int $width, int $height, string $path, string $file)
     {

        $image_file_name = $name . '.webp';
        Image::make($file)->fit($width,$height)->save(public_path($path).$image_file_name,50,'webp');
        return $image_file_name;
     }

     static public function deletePhoto($path,$img){
        $path = public_path($path).$img;

        if($img != '' && file_exists($path))
        {
            unlink($path);
        }
        
     }

     public static function imageUrl($path, string|null $image)
     {
      $url = url($path.$image);

      if(empty($image))
      {
         $url = url(self::DEFAULT_IMAGE);
      }
      return $url;
     }

     public static function prepareImageUrl($path, string|null $image)
     {
      $url = url($path.$image);

      if(empty($image))
      {
         $url = url(self::DEFAULT_IMAGE);
      }
      return $url;
     }

     public static function processImageUpload($file, $name,$path,$width,$height, $path_thumb=null,$width_thumb=0,$height_thumb=0, string|null $existing_photo = '')
    {

        if(!empty($existing_photo)){
        self::deletePhoto($path,$existing_photo);
        self::deletePhoto($path_thumb,$existing_photo); 
        }

        $photo_name = self::uploadImage($name,$width,$height,$path,$file);
                      self::uploadImage($name,$width_thumb,$height_thumb,$path_thumb,$file);

        return $photo_name;
    }
}