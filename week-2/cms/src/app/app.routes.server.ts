import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Define prerender parameters for documents/:id
  {
    path: 'documents/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      // Return an empty array to skip prerendering this route
      // OR return example parameters like: [{ id: '1' }, { id: '2' }]
      return Promise.resolve([]);
    }
  },
  // Define prerender parameters for contacts/:id
  {
    path: 'contacts/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      return Promise.resolve([]);
    }
  },
  // Catch-all for other routes that can be prerendered normally
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];


// import { RenderMode, ServerRoute } from '@angular/ssr';

// export const serverRoutes: ServerRoute[] = [
//   {
//     path: '**',
//     renderMode: RenderMode.Prerender
//   }
// ];
