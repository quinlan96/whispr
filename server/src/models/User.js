import { Model } from 'objection'
import Role from './Role'
import Track from './Track'

class User extends Model {
    authenticated(password) {
        return this.password === password
    }

    async getRoles() {
        return await (await this.$relatedQuery('roles')).map(role => role.name)
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