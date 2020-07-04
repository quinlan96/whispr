import { Model } from 'objection'
import Role from './Role'
import Track from './Track'

import { verify } from '../services/auth'

class User extends Model {
    async authenticated(password) {
		try {
			return await verify(password, this.password)
		} catch(e) {
			return false
		}
    }

    static get tableName() {
        return 'users'
	}
	
	static get relationMappings() {
		return {
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: Role,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'user_roles.user_id',
                        to: 'user_roles.role_id'
                    },
                    to: 'roles.id'
                }
            },
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