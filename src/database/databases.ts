import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite'

const sqlite = new SQLiteConnection(CapacitorSQLite)

let db: SQLiteDBConnection | null = null

export async function getDb() {
  if (db) {
    return db
  }

  db = await sqlite.createConnection(
    'camera_app',
    false,
    'no-encryption',
    1,
    false
  )

  await db.open()

  await criarTabelas()

  return db
}

async function criarTabelas() {
  if (!db) return

  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS fotos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      caminho TEXT NOT NULL,
      data TEXT NOT NULL,
      FOREIGN KEY(usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
    );
  `)
}

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string
): Promise<{
  sucesso: boolean
  mensagem: string
}> {

  const database = await getDb()

  try {

    await database.run(
      `
      INSERT INTO usuarios
      (nome, email, senha)
      VALUES (?, ?, ?)
      `,
      [
        nome,
        email,
        senha
      ]
    )


    return {

      sucesso: true,

      mensagem:
        'Cadastro realizado com sucesso.'

    }

  } catch (erro) {

    console.error(
      'Erro ao cadastrar usuário:',
      erro
    )


    return {

      sucesso: false,

      mensagem:
        'Este e-mail já está cadastrado.'

    }

  }

}

export async function realizarLogin(
  email: string,
  senha: string
) {
  const database = await getDb()

  const resultado = await database.query(
    `
    SELECT *
    FROM usuarios
    WHERE email = ?
    AND senha = ?
    LIMIT 1
    `,
    [email, senha]
  )

  if (!resultado.values || resultado.values.length === 0) {
    return null
  }

  return resultado.values[0]
}

export async function adicionarFoto(
  usuarioId: number,
  caminho: string
) {
  const database = await getDb()

  await database.run(
    `
    INSERT INTO fotos
    (usuario_id, caminho, data)
    VALUES (?, ?, ?)
    `,
    [
      usuarioId,
      caminho,
      new Date().toISOString()
    ]
  )
}

export async function buscarFotos(
  usuarioId: number
) {
  const database = await getDb()

  const resultado = await database.query(
    `
    SELECT *
    FROM fotos
    WHERE usuario_id = ?
    ORDER BY id DESC
    `,
    [usuarioId]
  )

  return resultado.values || []
}

export async function removerFoto(
  id: number
) {
  const database = await getDb()

  await database.run(
    `
    DELETE FROM fotos
    WHERE id = ?
    `,
    [id]
  )
}