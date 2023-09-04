<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopResource extends JsonResource
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
            'email' =>$this->email,
            'phone' =>$this->phone,
            'description' =>$this->description,
            'status' =>$this->status == Shop::STATUS_ACTIVE ? Shop::STATUS_ACTIVE_TEXT : Shop::STATUS_INACTIVE_TEXT,
            'photo' => ImageManager::imageUrl(Shop::THUMB_IMAGE_UPLOAD_PATH,$this->photo),
            'photo_full' => ImageManager::imageUrl(Shop::IMAGE_UPLOAD_PATH,$this->photo),
            'created_by' =>$this->user?->name,
            'created_at' =>$this->created_at->format('d-M-y'),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->format('d-M-y') : 'Not Updated',
            'address' => new AddressResource($this->address)
            

        ];
    }
}
