# Rediseño: portfolio de scroll largo unificado

## Context

El portfolio hoy es una single-page-app con dos layouts paralelos: `WindowManager` en desktop (toggle por click entre ventana "About" y ventana "My Career" con 4 tabs internas, incluida Experiencia) y `MobileLayout` (carousel swipe con 5 tabs). Ambos dependen de estado de React para decidir qué se ve.

El dueño del sitio quiere una UI más fácil de leer para visitantes no técnicos: sin clicks para descubrir contenido, todo visible scrolleando hacia abajo como un portfolio tradicional. Pide tres cambios puntuales:
1. La ventana "About me" se mantiene, con la foto de perfil movida *adentro* de la ventana (hoy está afuera, al lado).
2. La Experiencia laboral sale de las tabs de "My Career" y se muestra como timeline vertical a pantalla completa, fuera de cualquier ventana, apareciendo con scroll (referencia: timeline con línea conectora, logo circular, cargo/empresa/período).
3. "My Career" sigue siendo una ventana, ahora con solo 3 tabs (Educación, Cursos, Skills), que aparece más abajo en la página.
4. El formulario de contacto va al final de todo. El botón "Let's Talk" del navbar hace scroll a esa sección en vez de abrir el cliente de mail.

Esto implica reemplazar el modelo de "una sección visible a la vez, togglear por click" por un modelo de scroll largo con fade-in progresivo — que además permite unificar mobile y desktop en un solo layout responsive, eliminando el carousel swipe (que quedaría roto al sacar Experiencia de las tabs) y el menú hamburguesa.

Decisiones ya confirmadas con el usuario:
- Scroll normal apilado (no pinned/crossfade tipo Apple).
- Se mantiene drag + maximize en ambas ventanas (feature ya implementada).
- Mobile se unifica al mismo layout de scroll largo (sin carousel).
- Nav pills "About me" / "My Career" pasan a ser scroll-links.
- El timeline usa la estructura de la referencia visual pero con los tokens de color del sitio (no un tema oscuro fijo).
- Los items de Experiencia usan un círculo placeholder genérico en vez de logo real (no hay campo de imagen en los datos).

## Approach

### Modelo de datos (`lib/content.ts`)
- `CareerTabId`: pasa de `"experience" | "education" | "courses" | "skills"` a `"education" | "courses" | "skills"`.
- `CAREER_TABS`: se saca la entrada `experience`.
- `MOBILE_TABS` y `MobileTabId`: se eliminan (ya no hay carousel mobile).
- `SECTIONS`: sin cambios de forma (`about`/`career`), pero ahora sus `id` se usan como anchors de scroll, no como estado a togglear.
- `EXPERIENCE`, `EDUCATION`, `COURSES`, `SKILLS`, `ABOUT`, `HERO`, `CONTACT`: sin cambios de forma.

### Utilidad compartida de scroll
Nuevo `lib/scroll.ts` exportando `scrollToId(id: string)` (smooth scrollIntoView). Reemplaza la lógica duplicada de `scrollToContact` en `Home` y se reutiliza en el header nuevo (nav pills + Let's Talk).

### `components/mac-window.tsx`
- Se elimina el prop `onMinimize` y su UI asociada: el botón amarillo pasa a ser un `<span>` inerte, igual que el rojo (ya no existe el concepto de "minimizar para togglear sección").
- El resto (drag vía `useDragControls`, maximize con el botón verde, `interactive`/`dragConstraintsRef`) se mantiene igual que en la iteración anterior.

### `components/sections/home.tsx` (ventana About)
- Se agrega `<AvatarPlaceholder />` al inicio del `flex flex-col` existente (tamaño moderado, ej. `h-20 w-20`), antes del saludo. Resto del contenido intacto.
- El botón "Contacto" pasa a usar `scrollToId("contact")` desde el helper compartido en lugar de su handler local.

### `components/sections/experience.tsx` (timeline)
- Se reescribe el render: por cada `EXPERIENCE` item, una fila con:
  - columna izquierda: círculo placeholder (reutilizando el mismo patrón visual que `AvatarPlaceholder` pero más chico, ej. `h-14 w-14`) + línea vertical conectora (`border-l` o `div` de 1px) entre items, usando `border-border`/`bg-border`.
  - columna derecha: `role · company`, `period` (pill, reutilizando `Pill`), `description`, `tags`.
- Envuelto en `SectionHeading` (mismo eyebrow/title que hoy: "Experiencia" / "Dónde trabajé").
- Cada item envuelto en `<Reveal delay={i * 0.08}>` para aparición escalonada al scrollear.
- Ya no se importa/usa dentro de `WindowContent` — pasa a renderizarse directo en la página, fuera de `MacWindow`.

### `components/window-content.tsx`
- Se saca el `case "experience"` y su import de `Experience`.

### Nuevo `components/site.tsx` (reemplaza `window-manager.tsx`)
Estructura:
```
<header sticky> nombre/rol, nav (About me / My Career → scrollToId), Let's Talk → scrollToId("contact"), LanguageToggle </header>
<main>
  <Reveal><section id="about"><MacWindow interactive dragConstraintsRef={aboutStageRef}><Home/></MacWindow></section></Reveal>
  <Reveal><section id="experience"><Experience/></section></Reveal>
  <Reveal><section id="career"><MacWindow interactive dragConstraintsRef={careerStageRef}>{tabs nav + WindowContent}</MacWindow></section></Reveal>
  <Reveal><section id="contact"><Contact/></section></Reveal>
</main>
```
- Cada `MacWindow` vive dentro de su propio contenedor `relative min-h-[...]` (mismo patrón que el stage actual) con su propio `ref`, ya que ahora ambas ventanas están montadas permanentemente (no hay más mount/unmount al cambiar de "sección" — ya no existe ese estado).
- `careerTab` sigue siendo estado local (`useState<CareerTabId>`), default `"education"` (primer tab restante).
- Sin `AnimatePresence` ni estado `section` — se elimina toda esa lógica de toggle.

### Borrado
- `components/window-manager.tsx`, `components/mobile-layout.tsx`, `components/topbar.tsx`.

### `app/page.tsx`
- Se elimina el split `md:hidden`/`md:block`. Queda: `<Site /><Footer />`.

## Testing / Verification
- `npx tsc --noEmit` y `npm run lint` limpios.
- Levantar `npm run dev`, revisar en browser:
  - Scroll completo de arriba a abajo: About (con avatar adentro) → Experience timeline (aparece con fade al scrollear) → Career window (3 tabs, sin Experiencia) → Contact al final.
  - Nav pills y Let's Talk hacen scroll suave a la sección correcta.
  - Drag y maximize siguen funcionando en ambas ventanas (maximize/restore verificable con click real; drag se verifica con test de PointerEvent directo si el tooling de automation vuelve a fallar, como en la iteración anterior).
  - Botón amarillo y rojo no hacen nada (sin handler).
  - Probar en viewport angosto (mobile): mismo layout, responsive, sin carousel ni hamburguesa.
