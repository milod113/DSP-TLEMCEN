<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('page_contents')->updateOrInsert(
            ['key' => 'mot_directeur_image'],
            [
                'page' => 'direction',
                'label_fr' => 'Image du directeur',
                'label_ar' => 'صورة المدير',
                'value_fr' => null,
                'value_ar' => null,
                'type' => 'image',
                'sort_order' => 4,
            ]
        );
    }

    public function down(): void
    {
        DB::table('page_contents')->where('key', 'mot_directeur_image')->delete();
    }
};
