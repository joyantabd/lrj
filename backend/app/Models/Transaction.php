<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Transaction extends Model
{
    use HasFactory;
    protected $guarded = [];
    public const CREDIT = 1;
    public const DEBIT = 2;
    public const SUCCESS = 1;
    public const FAILED = 1;


    public function storeTransaction($input,$order)
    {

        $transaction_data = $this->preapreData($input,$order);
        return self::query()->create($transaction_data);
    }

    public function transactionable()
    {
        return $this->morphTo();
    }

    private function preapreData($input,$order)
    {
        return [
            'order_id' => $order->id ?? 0,
            'customer_id' =>$input['order_summery']['customer_id'],
            'amount'=>$input['order_summery']['paid_amount'],
            'payment_method_id' =>$input['order_summery']['payment_method_id'],
            'trx_type' => self::CREDIT,
            'status' =>self::SUCCESS,
            'trx_id' => $input['order_summery']['trx_id'],
            'transactionable_type' => SalesManager::class,
            'transactionable_id' => Auth::user()->id

        ];

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
}
