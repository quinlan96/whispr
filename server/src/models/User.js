import { Model } from 'objection'

class User extends Model {
    static get tableName() {
        return 'users'
    }

    $beforeInsert() {
        this.created_at = new Date().toISOString()
    }
    
    $beforeUpdate() {
        this.updated_at = new Date().toISOString()
    }
}

export default User