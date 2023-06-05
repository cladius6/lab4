const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const jwt = require('jsonwebtoken')
const pool = require('./db')

app.use(express.json())
const port = 3004

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    console.log({ username, password })
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log({ hashedPassword })
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    )
    res.json(newUser.rows[0])
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ])

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password
    )

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.rows[0].id }, 'secret_key')
    res.json({ token })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

function authenticateToken(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  jwt.verify(token, 'secret_key', (error, user) => {
    if (error) {
      return res.status(403).json({ message: 'Invalid token' })
    }

    req.user = user
    next()
  })
}

app.get('/notes', authenticateToken, async (req, res) => {
  try {
    const notes = await pool.query('SELECT * FROM notes WHERE user_id = $1', [req.user.userId]);
    res.json(notes.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.get('/notes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const note = await pool.query('SELECT * FROM notes WHERE id = $1 AND user_id = $2', [id, req.user.userId]);

    if (note.rows.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.post('/notes', authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await pool.query(
      'INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, req.user.userId]
    );
    res.json(newNote.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.put('/notes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await pool.query(
      'UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, content, id, req.user.userId]
    );

    if (updatedNote.rows.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(updatedNote.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.delete('/notes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await pool.query('DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.userId]);

    if (deletedNote.rows.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(` Example app listening on port ${port}`)
})
