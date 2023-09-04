<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Manager\PriceManager;
use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductList extends JsonResource
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
            'sku' =>$this->sku,
            'cost' =>$this->cost . PriceManager::CURRENCY_SYMBOL,
            'price' =>$this->price . PriceManager::CURRENCY_SYMBOL,
            'original_price' =>$this->price,
            'sell_price' => PriceManager::calculate_sell_price($this->price,$this->discount_percent,$this->discount_fixed,$this->discount_start,$this->discount_end),
            'stock' =>$this->stock,
            'description' =>$this->description,
            'discount_fixed' => $this->discount_fixed . PriceManager::CURRENCY_SYMBOL,
            'discount_percent' => $this->discount_percent . ' %',
            'discount_start' => $this->discount_start? $this->discount_start : null,
            'discount_end' =>$this->discount_end?  $this->discount_end : null,
            'status' =>$this->status == Product::STATUS_ACTIVE ? 'Active' : 'Inactive',
            'description' =>$this->description,
            'created_at' =>$this->created_at->format('d-M-y'),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->format('d-M-y') : 'Not Updated',
            'primary_photo' => ImageManager::prepareImageUrl(ProductPhoto::THUMB_IMAGE_UPLOAD_PATH,$this->primary_photo?->photo),

            'brand' => $this->brand?->name,
            'category' => $this->category?->name,
            'supplier' => $this->supplier ? $this->supplier?->name. ' '. $this->supplier?->phone : null,
            'country' => $this->country?->name,
            'sub_category' => $this->sub_category?->name,
            'creator' =>$this->creator?->name,
            'updator' =>$this->updator?->name,

            'attributes' => ProductListAttribute::collection($this->product_attributes), 

        ];
    }
}
