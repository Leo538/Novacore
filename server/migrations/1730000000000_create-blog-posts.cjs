'use strict';

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
exports.up = (pgm) => {
  pgm.createTable('blog_posts', {
    id: 'id',
    titulo: { type: 'varchar(500)', notNull: true },
    descripcion: { type: 'text', notNull: true },
    fecha: { type: 'timestamptz', notNull: true, default: pgm.func('NOW()') },
    enlaces: { type: 'jsonb', notNull: true, default: "'[]'" },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('NOW()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('NOW()') },
  }, { ifNotExists: true });
};

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
exports.down = (pgm) => {
  pgm.dropTable('blog_posts');
};
