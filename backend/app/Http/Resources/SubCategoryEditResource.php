<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubCategoryEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' =>$this->name,
            'slug' =>$this->slug,
            'serial' =>$this->serial,
            'status' =>$this->status,
            'description' =>$this->description,
            'category_id' =>$this->category_id,
            'photo_preview' => ImageManager::prepareImageUrl(SubCategory::THUMB_IMAGE_UPLOAD_PATH,$this->photo),

        ];
    }
}
