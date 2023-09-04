<?php

namespace App\Models;

use App\Manager\OrderManager;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use DB;

class Order extends Model
{
    use HasFactory;
    protected $guarded = [];

    public const STATUS_PENDING = 1;
    public const STATUS_PROCESSED = 2;
    public const STATUS_COMPLETED = 3;
    public const SHIPMENT_STATUS_COMPLETED = 1;
    public const PAYMENT_STATUS_PAID = 1;
    public const PAYMENT_STATUS_PARTIAL = 2;
    public const PAYMENT_STATUS_UNPAID = 3;


    public function getData($input)
    {
        $per_page = $input['per_page'] ?? 10;
        $is_admin = Auth::guard('admin')->check();

        $query = self::query();
        $query->with(['customer:id,name,phone','payment_method:id,name','sales_manager:id,name','shop:id,name']);

        if(!$is_admin){
            $query->where('shop_id',Auth::user()->shop_id);

        }

        return $query->paginate($per_page);




        
        $query = self::query();
        if(!empty($input['search'])){
            $query->where('name','like','%'.$input['search'].'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'],$input['dirrection'] ?? 'asc');
        }

       return $query->with('user:id,name')->paginate($per_page);
    }

    public function placeOrder($input)
    {
        $order_data = $this->prepareData($input);
        if(isset($order_data['error_description'])){
            return $order_data;
        }
        $order = self::query()->create($order_data['order_data']);
        (new OrderDetails())->storeOrder($order_data['order_details'],$order);
        (new Transaction())->storeTransaction($input,$order);
        return $order;
        
    }

    private function prepareData($input){

        $price = OrderManager::calculate_order_prices($input);

        if(isset($price['error_description'])){
        return $price;
        }else{

        $order_data =  [
            'customer_id' =>$input['order_summery']['customer_id'],
            'sales_manager_id' => Auth::user()->id,
            'shop_id' =>Auth::user()->shop_id,
            'sub_total' =>$price['sub_total'],
            'discount'=>$price['discount'],
            'total'=> $price['total'],
            'quantity'=>$price['quantity'],
            'paid_amount'=>$input['order_summery']['paid_amount'],
            'due_amount'=>$input['order_summery']['due_amount'],
            'order_status' => self::STATUS_COMPLETED,
            'order_number'=> OrderManager::generateOrderNumber(Auth::user()->shop_id),
            'payment_method_id' =>$input['order_summery']['payment_method_id'],
            'payment_status' =>OrderManager::decidePaymentStatus($price['total'],$input['order_summery']['paid_amount']),
            'shipment_status' =>self::SHIPMENT_STATUS_COMPLETED,
        ];

        return  ['order_data' =>$order_data,'order_details' =>$price['order_details']];
                    
    }

    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function payment_method()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function sales_manager()
    {
        return $this->belongsTo(SalesManager::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function order_details()
    {
        return $this->hasMany(OrderDetails::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function getAllOrders($is_admin,$columns = ['*'])
    {
    $query = DB::table('orders')->select($columns);
    if(!$is_admin){
        $query->where('sales_manager_id',Auth::user()->id);
    }
    return collect($query->get());

    }



}
