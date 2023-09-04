<?php 

namespace App\Manager;

use App\Models\Product;
use Carbon\Carbon;

class OrderManager{

    private const ORDER_PREFIX = 'JPS';


    public static function generateOrderNumber($shop_id)
{
    return self::ORDER_PREFIX.$shop_id.Carbon::now()->format('dmy').random_int(100,999);
}

public static function calculate_order_prices($input)
{
    $sub_total = 0;
    $discount = 0;
    $total = 0;
    $quantity = 0;
    $order_details = [];


    if(isset($input['carts'])){
        foreach($input['carts'] as $key=>$cart){
            $product = (new Product())->getProductById($key);
            if($product && $product->stock >= $cart['quantity']){
                $price = PriceManager::calculate_sell_price($product->price,$product->discount_percent,$product->discount_fixed,$product->discount_start,$product->discount_end);

                $quantity += $cart['quantity'];
                $discount += $price['discount'] * $cart['quantity'];
                $sub_total += $product?->price * $cart['quantity'];
                $total += $price['price'] * $cart['quantity'];

                $product_data['stock'] = $product->stock - $cart['quantity'];
                $product->update($product_data);
                $product->quantity = $cart['quantity'];

                $order_details[] = $product;
            }else{
                info('PRODUCT_STOCK_OUT', ['product'=>$product,'carts'=>$cart]);
                return['error_description'=>$product->name . ' is Stockout'];
                break;
            }
          
        }
        
    }

    return ['sub_total'=>$sub_total,'discount'=>$discount,'total'=>$total,'quantity'=>$quantity,'order_details'=>$order_details];
}

public static function decidePaymentStatus($amount,$paid_amount)
{
    // Paid=1,Partial Paid=2,Unpaid=3
    $payment_status = 3;

    if($amount == $paid_amount){
        $payment_status = 1;
    }else if(($amount-$paid_amount) > 0){
        $payment_status = 2;
    }else{
        $payment_status = 3;
    }

    // if($amount <= $paid_amount)
    // {
    //     $payment_status = 1;
    // }else if($paid_amount <= 0){
    //     $payment_status = 3;
    // }else{
    //     $payment_status = 2;
    // }

    return $payment_status;


}
}

