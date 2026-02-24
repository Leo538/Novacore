'use strict';

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
exports.up = (pgm) => {
  pgm.addColumns('blog_posts', {
    imagenes: { type: 'jsonb', notNull: true, default: pgm.func("'[]'::jsonb") },
    autores: { type: 'jsonb', notNull: true, default: pgm.func("'[]'::jsonb") },
  }, { ifNotExists: true });
};

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
exports.down = (pgm) => {
  pgm.dropColumns('blog_posts', ['imagenes', 'autores']);
};
