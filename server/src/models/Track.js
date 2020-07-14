import { Model } from 'objection'
import User from './User'
import { API_BASE, STORAGE_DIR } from '../constants'

class Track extends Model {
    static get tableName() {
        return 'tracks'
	}

	getTrackUrl() {
		return `${API_BASE}/tracks/${this.id}/${this.file}`
	}

	getTrackFile() {
		return `${STORAGE_DIR}/${this.id}/${this.file}`
    }

    getPublicJson() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            trackUrl: this.getTrackUrl(),
            waveform: this.waveform,
            status: this.status,
            createdAt: this.created_at
        }
    }
	
	static get relationMappings() {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'users.id',
					to: 'tracks.user_id'
				}
            },
            likes: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'tracks.id',
                    through: {
                        from: 'track_likes.track_id',
                        to: 'track_likes.user_id'
                    },
                    to: 'users.id'
                }
            }
		}
	}

    $beforeInsert() {
        this.created_at = new Date().toISOString()
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString()
    }
}

export default Track