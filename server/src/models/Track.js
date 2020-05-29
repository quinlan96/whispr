import { Model } from 'objection'

class Track extends Model {
    static get tableName() {
        return 'tracks'
    }

    $beforeInsert() {
        this.created_at = new Date().toISOString()
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString()
    }
}

export default Track