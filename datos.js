// Datos de ejemplo por alumno (más adelante esto vendría de una base de datos).
// La clave es el nombre de usuario con el que se loguea el alumno.
// notas: [1er trimestre, 2do trimestre, 3er trimestre] (null = todavía sin nota)
// asistencia: clases dadas y cantidad de ausencias por materia
//   Se puede escribir como totales { clases, ausentes } (se reparten solos entre marzo y noviembre)
//   o mes por mes: { meses: { "3": { clases: 18, ausentes: 1 }, "4": { ... } } }
// La docente "Marta Ruiz" dicta 10 materias: Matemática, Álgebra, Geometría, Física,
// Química, Informática, Economía, Estadística, Tecnología y Filosofía.
const DATOS_ALUMNOS = {
  "ana": {
    "materias": [
      {
        "nombre": "Matemática",
        "docente": "Marta Ruiz",
        "horario": "Lunes y miércoles 8:00"
      },
      {
        "nombre": "Álgebra",
        "docente": "Marta Ruiz",
        "horario": "Lunes 10:00"
      },
      {
        "nombre": "Geometría",
        "docente": "Marta Ruiz",
        "horario": "Martes 10:00"
      },
      {
        "nombre": "Física",
        "docente": "Marta Ruiz",
        "horario": "Martes 14:00"
      },
      {
        "nombre": "Química",
        "docente": "Marta Ruiz",
        "horario": "Miércoles 14:00"
      },
      {
        "nombre": "Informática",
        "docente": "Marta Ruiz",
        "horario": "Jueves 8:00"
      },
      {
        "nombre": "Economía",
        "docente": "Marta Ruiz",
        "horario": "Jueves 14:00"
      },
      {
        "nombre": "Estadística",
        "docente": "Marta Ruiz",
        "horario": "Viernes 10:00"
      },
      {
        "nombre": "Tecnología",
        "docente": "Marta Ruiz",
        "horario": "Viernes 14:00"
      },
      {
        "nombre": "Filosofía",
        "docente": "Marta Ruiz",
        "horario": "Viernes 16:00"
      },
      {
        "nombre": "Lengua y Literatura",
        "docente": "Carlos Díaz",
        "horario": "Martes y jueves 8:00"
      },
      {
        "nombre": "Historia",
        "docente": "Laura Sosa",
        "horario": "Miércoles 10:00"
      },
      {
        "nombre": "Biología",
        "docente": "Pablo Ferrari",
        "horario": "Viernes 8:00"
      },
      {
        "nombre": "Inglés",
        "docente": "Julia Méndez",
        "horario": "Jueves 10:00"
      }
    ],
    "notas": {
      "Matemática": [
        8,
        7,
        null
      ],
      "Álgebra": [
        7,
        8,
        null
      ],
      "Geometría": [
        9,
        8,
        null
      ],
      "Física": [
        6,
        7,
        null
      ],
      "Química": [
        5,
        6,
        null
      ],
      "Informática": [
        10,
        10,
        null
      ],
      "Economía": [
        7,
        6,
        null
      ],
      "Estadística": [
        8,
        9,
        null
      ],
      "Tecnología": [
        9,
        9,
        null
      ],
      "Filosofía": [
        6,
        5,
        null
      ],
      "Lengua y Literatura": [
        9,
        9,
        null
      ],
      "Historia": [
        6,
        5,
        null
      ],
      "Biología": [
        7,
        8,
        null
      ],
      "Inglés": [
        10,
        9,
        null
      ]
    },
    "asistencia": {
      "Matemática": {
        "clases": 40,
        "ausentes": 2
      },
      "Álgebra": {
        "clases": 30,
        "ausentes": 1
      },
      "Geometría": {
        "clases": 28,
        "ausentes": 0
      },
      "Física": {
        "clases": 32,
        "ausentes": 3
      },
      "Química": {
        "clases": 30,
        "ausentes": 4
      },
      "Informática": {
        "clases": 24,
        "ausentes": 0
      },
      "Economía": {
        "clases": 20,
        "ausentes": 2
      },
      "Estadística": {
        "clases": 18,
        "ausentes": 1
      },
      "Tecnología": {
        "clases": 22,
        "ausentes": 0
      },
      "Filosofía": {
        "clases": 20,
        "ausentes": 6
      },
      "Lengua y Literatura": {
        "clases": 38,
        "ausentes": 1
      },
      "Historia": {
        "clases": 20,
        "ausentes": 6
      },
      "Biología": {
        "clases": 18,
        "ausentes": 0
      },
      "Inglés": {
        "clases": 19,
        "ausentes": 3
      }
    }
  },
  "luis": {
    "materias": [
      {
        "nombre": "Matemática",
        "docente": "Marta Ruiz",
        "horario": "Lunes y miércoles 8:00"
      },
      {
        "nombre": "Álgebra",
        "docente": "Marta Ruiz",
        "horario": "Lunes 10:00"
      },
      {
        "nombre": "Física",
        "docente": "Marta Ruiz",
        "horario": "Martes 14:00"
      },
      {
        "nombre": "Química",
        "docente": "Marta Ruiz",
        "horario": "Miércoles 14:00"
      },
      {
        "nombre": "Informática",
        "docente": "Marta Ruiz",
        "horario": "Jueves 8:00"
      },
      {
        "nombre": "Economía",
        "docente": "Marta Ruiz",
        "horario": "Jueves 14:00"
      },
      {
        "nombre": "Filosofía",
        "docente": "Marta Ruiz",
        "horario": "Viernes 16:00"
      },
      {
        "nombre": "Historia",
        "docente": "Laura Sosa",
        "horario": "Miércoles 10:00"
      },
      {
        "nombre": "Inglés",
        "docente": "Julia Méndez",
        "horario": "Jueves 10:00"
      }
    ],
    "notas": {
      "Matemática": [
        5,
        6,
        null
      ],
      "Álgebra": [
        6,
        6,
        null
      ],
      "Física": [
        7,
        8,
        null
      ],
      "Química": [
        4,
        5,
        null
      ],
      "Informática": [
        8,
        9,
        null
      ],
      "Economía": [
        6,
        7,
        null
      ],
      "Filosofía": [
        7,
        7,
        null
      ],
      "Historia": [
        7,
        7,
        null
      ],
      "Inglés": [
        8,
        6,
        null
      ]
    },
    "asistencia": {
      "Matemática": {
        "clases": 40,
        "ausentes": 8
      },
      "Álgebra": {
        "clases": 30,
        "ausentes": 3
      },
      "Física": {
        "clases": 32,
        "ausentes": 2
      },
      "Química": {
        "clases": 30,
        "ausentes": 9
      },
      "Informática": {
        "clases": 24,
        "ausentes": 1
      },
      "Economía": {
        "clases": 20,
        "ausentes": 2
      },
      "Filosofía": {
        "clases": 20,
        "ausentes": 1
      },
      "Historia": {
        "clases": 20,
        "ausentes": 2
      },
      "Inglés": {
        "clases": 19,
        "ausentes": 1
      }
    }
  }
};