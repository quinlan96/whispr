import { Model } from 'objection'
import User from './User'

class Track extends Model {
    static get tableName() {
        return 'tracks'
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