<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' =>$this->id,
            'name' =>$this->name,
            'slug' =>$this->slug,
            'serial' =>$this->serial,
            'status' =>$this->status == 1 ? 'Active' : 'Inactive',
            'description' =>$this->description,
            'photo' => ImageManager::imageUrl(SubCategory::THUMB_IMAGE_UPLOAD_PATH,$this->photo),
            'photo_full' => ImageManager::imageUrl(SubCategory::IMAGE_UPLOAD_PATH,$this->photo),
            'created_by' =>$this->user?->name,
            'category_name' =>$this->category?->name,
            'created_at' =>$this->created_at->format('d-M-y'),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->format('d-M-y') : 'Not Updated',
        ];
    }
}
