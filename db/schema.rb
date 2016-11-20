# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161120035908) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cases", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messengers", force: :cascade do |t|
    t.text     "body"
    t.string   "photo1"
    t.integer  "report_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["report_id"], name: "index_messengers_on_report_id", using: :btree
    t.index ["user_id"], name: "index_messengers_on_user_id", using: :btree
  end

  create_table "reports", force: :cascade do |t|
    t.string   "name"
    t.string   "pet_type"
    t.string   "breed"
    t.string   "age"
    t.string   "color"
    t.string   "sex"
    t.string   "last_seen_date"
    t.string   "last_seen_address"
    t.float    "latitude"
    t.float    "longitude"
    t.text     "note"
    t.string   "report_type"
    t.integer  "user_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "photo1"
    t.string   "photo2"
    t.string   "photo3"
    t.integer  "case_id"
    t.index ["case_id"], name: "index_reports_on_case_id", using: :btree
    t.index ["user_id"], name: "index_reports_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "uid"
    t.string   "provider"
    t.string   "oauth_token"
    t.string   "oauth_secret"
    t.string   "avatar"
    t.text     "oauth_raw_data"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", using: :btree
  end

  add_foreign_key "messengers", "reports"
  add_foreign_key "messengers", "users"
  add_foreign_key "reports", "cases"
  add_foreign_key "reports", "users"
end
