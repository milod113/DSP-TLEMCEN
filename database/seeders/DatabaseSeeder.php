<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            ArticleSeeder::class,
            EtablissementSeeder::class,
            PreventionSeeder::class,
            AppelOffreSeeder::class,
            ProfessionalNoteSeeder::class,
            DocumentSeeder::class,
            PageContentSeeder::class,
            FaqSeeder::class,
            MediaSeeder::class,
        ]);
    }
}
