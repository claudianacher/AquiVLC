-- ==============================================================
-- Esquema y datos iniciales para la base de datos de Aquí Valencia
-- Ejecutar en el SQL Editor de tu panel de Supabase:
-- https://supabase.com/dashboard/project/bbklsalwduwxifdnprvt/sql
-- ==============================================================

-- 1. Crear tabla de actividades culturales
CREATE TABLE IF NOT EXISTS public.activities (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Cultura', 'Aire libre', 'Gastronomía', 'Deporte')),
    venue TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    price TEXT NOT NULL,
    image_url TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    description TEXT,
    scope TEXT DEFAULT 'hoy' CHECK (scope IN ('hoy', 'agenda', 'ambos')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para permitir lectura pública a visitantes anónimos
DROP POLICY IF EXISTS "Permitir lectura publica de actividades" ON public.activities;
CREATE POLICY "Permitir lectura publica de actividades"
    ON public.activities
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- 4. Insertar actividades de ejemplo de Valencia (si no existen)
INSERT INTO public.activities (id, title, category, venue, neighborhood, date, time, price, image_url, featured, description, scope)
VALUES
    (
        'activity-1',
        'Barro, manos y tradición',
        'Cultura',
        'Taller del Carmen · Ciutat Vella',
        'Ciutat Vella',
        '20 oct',
        '17:00',
        '28 €',
        '/assets/fotografia-actividad.png',
        true,
        'Taller artesanal de cerámica valenciana tradicional en el corazón del histórico barrio del Carmen.',
        'hoy'
    ),
    (
        'hoy-1',
        'Un bocado de Valencia',
        'Gastronomía',
        'Mercado Central',
        'El Mercat',
        '20 oct',
        '11:00',
        '18 €',
        '/assets/mercado-central.png',
        false,
        'Descubre los sabores más auténticos de la huerta y el mar en el impresionante edificio modernista del Mercado Central.',
        'hoy'
    ),
    (
        'hoy-2',
        'Barro, manos y tradición',
        'Cultura',
        'Taller del Carmen · Ciutat Vella',
        'El Carmen',
        '20 oct',
        '17:00',
        '28 €',
        '/assets/taller-carmen.png',
        false,
        'Taller artesanal de cerámica valenciana tradicional en el corazón del histórico barrio del Carmen.',
        'hoy'
    ),
    (
        'hoy-3',
        'Paseo entre puentes',
        'Aire libre',
        'Jardín del Turia · Pont del Real',
        'Jardines del Turia',
        '20 oct',
        '18:00',
        'Gratis',
        '/assets/jardin-turia.png',
        false,
        'Paseo guiado al atardecer entre los puentes históricos del antiguo cauce del río Turia.',
        'hoy'
    ),
    (
        'hoy-4',
        'Kilómetros junto al mar',
        'Deporte',
        'Paseo de la Malvarrosa',
        'La Malvarrosa',
        '20 oct',
        '19:00',
        'Gratis',
        '/assets/paseo-malvarrosa.png',
        false,
        'Sesión de running suave junto a la brisa marina recorriendo el paseo marítimo de Valencia.',
        'hoy'
    ),
    (
        'agenda-1',
        'La Albufera, sin prisa',
        'Aire libre',
        'Embarcadero de El Palmar',
        'Albufera',
        '24 oct',
        '17:30',
        '12 €',
        '/assets/albufera-atardecer.png',
        true,
        'Paseo al atardecer en barca tradicional valenciana navegando por las tranquilas aguas de La Albufera con guía local.',
        'agenda'
    ),
    (
        'agenda-2',
        'Sabores del Cabanyal',
        'Gastronomía',
        'Mercado del Cabanyal',
        'El Cabanyal',
        '25 oct',
        '11:00',
        '22 €',
        '/assets/sabores-cabanyal.png',
        false,
        'Ruta gastronómica y degustación de tapas marineras tradicionales en las calles de la arquitectura modernista popular.',
        'agenda'
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    venue = EXCLUDED.venue,
    neighborhood = EXCLUDED.neighborhood,
    date = EXCLUDED.date,
    time = EXCLUDED.time,
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    featured = EXCLUDED.featured,
    description = EXCLUDED.description,
    scope = EXCLUDED.scope;
