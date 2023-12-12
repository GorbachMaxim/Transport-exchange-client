import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Comment from '../core/types/comment';
import CarOffer from '../core/types/carOffer';
import CargoOffer from '../core/types/cargoOffer';

class CommentStore {
  private comments: Comment[] = null!;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchComments(offerId: number): Promise<void> {
    const comments = await api.fetchComments(offerId);

    if (comments !== null) {
      this.comments = comments;
    }
  }

  async addComment(offerId: number, comment: Comment): Promise<void> {
    await api.addComment(offerId, comment);
  }

  async deleteComment(commentId: number): Promise<void> {
    await api.deleteComment(commentId);
  }

  getComments() {
    return this.comments;
  }
}

export default CommentStore;
