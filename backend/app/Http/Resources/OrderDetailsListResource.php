<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Manager\PriceManager;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailsListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'product_name' =>$this->name,
            'brand'=>$this->brand?->name,
            'category'=>$this->category?->name,
            'sub_category'=>$this->sub_category?->name,
            'supplier'=>$this->supplier?->name,
            'cost'=>$this->cost,
            'photo'=> ImageManager::prepareImageUrl(ProductPhoto::THUMB_IMAGE_UPLOAD_PATH,$this->photo),
            'price'=>$this->price,
            'sell_price' => PriceManager::calculate_sell_price($this->price,$this->discount_percent,$this->discount_fixed,$this->discount_start,$this->discount_end),
            'quantity'=>$this->quantity,
            'discount'=>$this->discount,
            'sku'=>$this->sku,
            'discount_fixed' => $this->discount_fixed,
            'discount_percent' => $this->discount_percent,
            'discount_start' => $this->discount_start? $this->discount_start : null,
            'discount_end' =>$this->discount_end?  $this->discount_end : null,
        ];
    }
}
