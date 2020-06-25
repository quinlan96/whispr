import { Model } from 'objection'
import Track from './Track'

class User extends Model {
    authenticated(password) {
        return this.password === password
    }

    static get tableName() {
        return 'users'
	}
	
	static get relationMappings() {
		return {
			tracks: {
				relation: Model.HasManyRelation,
				modelClass: Track,
				join: {
					from: 'tracks.user_id',
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

export default User