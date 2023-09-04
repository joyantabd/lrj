<?php

namespace App\Manager;

use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class ReportManager
{
    public const LOW_STOCK_ALERT = 5;

    public $total_products = 0;
    public $total_stock = 0;
    public $low_stock = 0;
    public $low_stock_cost = 0;
    public $selling_stock_price = 0;
    public $possible_profit = 0;

    public $total_sell = 0;
    public $total_purchase = 0;
    public $today_total_sell = 0;
    public $today_total_purchase = 0;

    private Collection $products;
    private Collection $orders;

    private $is_admin = false;

    function __construct()
    {

        if(Auth::guard('admin')->check())
        {
            $this->is_admin = true;

        }
        $this->getProducts();
        $this->getOrders();
        $this->setTotalProduct();
        $this->Stock();
        $this->LowStock();
        $this->LowStockCost();
        $this->SalingStockPrice();
        $this->PosssibleProfit();
        $this->totalSale();
        $this->totalSaleToday();
        $this->totalPurchase();
        $this->totalPurchaseToday();


    }

    private function getProducts()
    {
        $this->products = (new Product())->getAllProduct();
        
    }

    private function setTotalProduct()
    {
        $this->total_products = count($this->products);
    }

    private function Stock()
    {
        $this->total_stock = $this->products->sum('stock');
    }

    private function LowStock()
    {
        $this->low_stock = $this->products->where('stock','<=',self::LOW_STOCK_ALERT)->count();
    }

    private function LowStockCost()
    {
        foreach($this->products as $product)
        {
            $this->low_stock_cost  += ($product->cost * $product->stock);
        }
  
    }

    private function SalingStockPrice()
    {
        foreach($this->products as $product)
        {
            $this->selling_stock_price  += ($product->price * $product->stock);
        }
  
    }

    private function PosssibleProfit()
    {
        $this->possible_profit = ($this->selling_stock_price - $this->low_stock_cost);
    }

    private function getOrders()
    {
        $this->orders = (new Order())->getAllOrders($this->is_admin);

    }

    private function totalSale()
    {
        $this->total_sell = $this->orders->sum('total');
    }

    private function totalSaleToday()
    {
        $this->today_total_sell = $this->orders->whereBetween('created_at',[Carbon::today()->startOfDay(),Carbon::today()->endOfDay()])->sum('total');
    }

    private function totalPurchase()
    {
        $this->total_purchase = $this->low_stock_cost;
    }

    private function totalPurchaseToday()
    {
        
        $product_buy_today = $this->products->whereBetween('created_at',[Carbon::today()->startOfDay(),Carbon::today()->endOfDay()]);
        foreach($product_buy_today as $product)
        {
            $this->today_total_purchase +=  ($product->cost * $product->stock);

        }

    }

}