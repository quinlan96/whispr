import { Model } from 'objection'
import User from './User'

class Role extends Model {
    static get tableName() {
        return 'roles'
	}

	static get relationMappings() {
		return {
			user: {
				relation: Model.ManyToManyRelation,
				modelClass: User,
				join: {
                    from: 'roles.id',
                    through: {
                        from: 'user_roles.role_id',
                        to: 'user_roles.user_id'
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

export default Role