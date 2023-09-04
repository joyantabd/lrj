<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandResource extends JsonResource
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
            'photo' => ImageManager::imageUrl(Brand::THUMB_IMAGE_UPLOAD_PATH,$this->photo),
            'photo_full' => ImageManager::imageUrl(Brand::IMAGE_UPLOAD_PATH,$this->photo),
            'created_by' =>$this->user?->name,
            'created_at' =>$this->created_at->format('d-M-y'),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->format('d-M-y') : 'Not Updated',
        ];
    }
}
