const CommentaireDao = require('../dao/CommentaireDao');

class CommentaireController {
  async createCommentaire(req, res) {
    try {
      const newCommentaire = await CommentaireDao.create(req.body);
      res.status(201).json(newCommentaire);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getCommentairesByFilm(req, res) {
    try {
      const commentaires = await CommentaireDao.findByFilm(req.params.filmId);
      res.status(200).json(commentaires);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCommentaire(req, res) {
    try {
      const updatedCommentaire = await CommentaireDao.update(req.params.id, req.body);
      if (!updatedCommentaire) {
        return res.status(404).json({ message: 'Commentaire not found' });
      }
      res.status(200).json(updatedCommentaire);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteCommentaire(req, res) {
    try {
      const deletedCommentaire = await CommentaireDao.delete(req.params.id);
      if (!deletedCommentaire) {
        return res.status(404).json({ message: 'Commentaire not found' });
      }
      res.status(200).json({ message: 'Commentaire deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CommentaireController();