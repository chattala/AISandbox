export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      apikeys: {
        Row: {
          created: string | null
          hash: string
          id: string
          key: string
          name: string
          user_id: string
        }
        Insert: {
          created?: string | null
          hash: string
          id?: string
          key: string
          name: string
          user_id: string
        }
        Update: {
          created?: string | null
          hash?: string
          id?: string
          key?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "apikeys_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      apiusage: {
        Row: {
          api_key: string | null
          cost: number
          created_at: string
          description: string
          execution_time: number
          id: string
          project_id: string | null
          source: string
          user_id: string
        }
        Insert: {
          api_key?: string | null
          cost: number
          created_at?: string
          description?: string
          execution_time: number
          id?: string
          project_id?: string | null
          source: string
          user_id: string
        }
        Update: {
          api_key?: string | null
          cost?: number
          created_at?: string
          description?: string
          execution_time?: number
          id?: string
          project_id?: string | null
          source?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "apiusage_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      feedback: {
        Row: {
          created_at: string
          email: string
          feedback: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          feedback: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          feedback?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          data: Json
          favorite: boolean
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          favorite?: boolean
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          favorite?: boolean
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          active: boolean
          created_at: string
          id: string
          itemId: string | null
          stripe_customer_id: string
          user_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          itemId?: string | null
          stripe_customer_id: string
          user_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          itemId?: string | null
          stripe_customer_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          whitelisted: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          whitelisted?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          whitelisted?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
