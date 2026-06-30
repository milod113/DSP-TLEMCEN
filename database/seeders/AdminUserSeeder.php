<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        if (!User::where('email', 'admin@dsp-tlemcen.dz')->exists()) {
            User::create([
                'name' => 'Administrateur DSP',
                'email' => 'admin@dsp-tlemcen.dz',
                'password' => bcrypt('admin123'),
                'is_admin' => true,
            ]);
        }
    }
}
