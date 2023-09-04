<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payment_methods = [
            ['name' => 'Cash','status' => 1,'account_number' => ''],
            ['name' => 'bKash','status' => 1,'account_number' => '01724620277'],
            ['name' => 'Nogod','status' => 1,'account_number' => '01724620277'],
            ['name' => 'Rocket','status' => 1,'account_number' => '01724620277'],
            ];

            (new PaymentMethod())->insert($payment_methods);
    }

}
