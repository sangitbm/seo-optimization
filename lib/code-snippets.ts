// ─── Code Snippets Library ───────────────────────────────────────────────────
// Each snippet has a generate() function that takes user-configured options
// and returns a production-ready code string.

export type CodeCategory =
  | "CRUD"
  | "Authentication"
  | "File Handling"
  | "API Calls"
  | "Database"
  | "Validation"
  | "Pagination";

export const codeCategories: { id: CodeCategory; label: string; emoji: string; description: string }[] = [
  { id: "CRUD",           label: "CRUD",           emoji: "⚡", description: "Create, Read, Update, Delete operations" },
  { id: "Authentication", label: "Authentication", emoji: "🔐", description: "Login, JWT, OAuth2, session handling" },
  { id: "File Handling",  label: "File Handling",  emoji: "📁", description: "Upload, download, read & write files" },
  { id: "API Calls",      label: "API Calls",       emoji: "🌐", description: "HTTP requests, REST client code" },
  { id: "Database",       label: "Database",        emoji: "🗄️", description: "ORM queries, raw SQL, migrations" },
  { id: "Validation",     label: "Validation",      emoji: "✅", description: "Input validation & schema parsing" },
  { id: "Pagination",     label: "Pagination",      emoji: "📄", description: "List pagination, cursor, offset/limit" },
];

export type Language =
  | "Python"
  | "Django"
  | "FastAPI"
  | "Node.js"
  | "Express"
  | "Laravel"
  | "Rails";

export interface SnippetOption {
  id: string;
  label: string;
  type: "text" | "select";
  placeholder?: string;
  choices?: string[];
  default: string;
}

export interface Snippet {
  id: string;
  category: CodeCategory;
  language: Language;
  title: string;
  description: string;
  fileExtension: string;
  options: SnippetOption[];
  generate: (opts: Record<string, string>) => string;
}

// ─── Helper ──────────────────────────────────────────────────────────────────
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const lower = (s: string) => s.toLowerCase();
const snake = (s: string) => s.replace(/\s+/g, "_").toLowerCase();
const plural = (s: string) => {
  const l = lower(s);
  if (l.endsWith("y")) return l.slice(0, -1) + "ies";
  if (l.endsWith("s") || l.endsWith("x") || l.endsWith("z")) return l + "es";
  return l + "s";
};

// ─── All Snippets ─────────────────────────────────────────────────────────────
export const snippets: Snippet[] = [

  // ───────────────────────── CRUD ──────────────────────────────────────────

  {
    id: "python-crud",
    category: "CRUD",
    language: "Python",
    title: "Python CRUD (SQLAlchemy)",
    description: "Full CRUD operations using SQLAlchemy ORM",
    fileExtension: "py",
    options: [
      { id: "model",    label: "Model Name",  type: "text",   placeholder: "User", default: "User" },
      { id: "table",    label: "Table Name",  type: "text",   placeholder: "users", default: "users" },
      { id: "field1",   label: "Field 1",     type: "text",   placeholder: "name", default: "name" },
      { id: "field2",   label: "Field 2",     type: "text",   placeholder: "email", default: "email" },
    ],
    generate: (o) => `from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import declarative_base, Session

Base = declarative_base()
engine = create_engine("sqlite:///./app.db")

class ${cap(o.model)}(Base):
    __tablename__ = "${snake(o.table || plural(o.model))}"
    id      = Column(Integer, primary_key=True, index=True)
    ${snake(o.field1)} = Column(String, nullable=False)
    ${snake(o.field2)} = Column(String, unique=True, nullable=False)

Base.metadata.create_all(bind=engine)

# ── CREATE ────────────────────────────────────────────────
def create_${snake(o.model)}(${snake(o.field1)}: str, ${snake(o.field2)}: str) -> ${cap(o.model)}:
    with Session(engine) as db:
        obj = ${cap(o.model)}(${snake(o.field1)}=${snake(o.field1)}, ${snake(o.field2)}=${snake(o.field2)})
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

# ── READ ──────────────────────────────────────────────────
def get_${snake(o.model)}(${snake(o.model)}_id: int) -> ${cap(o.model)} | None:
    with Session(engine) as db:
        return db.get(${cap(o.model)}, ${snake(o.model)}_id)

def get_all_${plural(snake(o.model))}() -> list[${cap(o.model)}]:
    with Session(engine) as db:
        return db.query(${cap(o.model)}).all()

# ── UPDATE ────────────────────────────────────────────────
def update_${snake(o.model)}(${snake(o.model)}_id: int, **kwargs) -> ${cap(o.model)} | None:
    with Session(engine) as db:
        obj = db.get(${cap(o.model)}, ${snake(o.model)}_id)
        if not obj:
            return None
        for key, value in kwargs.items():
            setattr(obj, key, value)
        db.commit()
        db.refresh(obj)
        return obj

# ── DELETE ────────────────────────────────────────────────
def delete_${snake(o.model)}(${snake(o.model)}_id: int) -> bool:
    with Session(engine) as db:
        obj = db.get(${cap(o.model)}, ${snake(o.model)}_id)
        if not obj:
            return False
        db.delete(obj)
        db.commit()
        return True
`,
  },

  {
    id: "django-crud",
    category: "CRUD",
    language: "Django",
    title: "Django REST Framework CRUD",
    description: "Model, Serializer, and ViewSet for full CRUD with DRF",
    fileExtension: "py",
    options: [
      { id: "model",   label: "Model Name", type: "text", placeholder: "Product", default: "Product" },
      { id: "field1",  label: "Field 1",    type: "text", placeholder: "name",    default: "name" },
      { id: "field2",  label: "Field 2",    type: "text", placeholder: "price",   default: "price" },
      { id: "field2type", label: "Field 2 Type", type: "select", choices: ["CharField", "IntegerField", "FloatField", "DecimalField", "BooleanField", "TextField"], default: "FloatField" },
    ],
    generate: (o) => `# models.py
from django.db import models

class ${cap(o.model)}(models.Model):
    ${snake(o.field1)} = models.CharField(max_length=255)
    ${snake(o.field2)} = models.${o.field2type}()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.${snake(o.field1)}


# serializers.py
from rest_framework import serializers
from .models import ${cap(o.model)}

class ${cap(o.model)}Serializer(serializers.ModelSerializer):
    class Meta:
        model  = ${cap(o.model)}
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]


# views.py
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from .models import ${cap(o.model)}
from .serializers import ${cap(o.model)}Serializer

class ${cap(o.model)}ViewSet(viewsets.ModelViewSet):
    queryset         = ${cap(o.model)}.objects.all()
    serializer_class = ${cap(o.model)}Serializer
    permission_classes = [IsAuthenticated]
    filter_backends  = [filters.SearchFilter, filters.OrderingFilter]
    search_fields    = ["${snake(o.field1)}"]
    ordering_fields  = ["${snake(o.field2)}", "created_at"]


# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ${cap(o.model)}ViewSet

router = DefaultRouter()
router.register(r"${plural(snake(o.model))}", ${cap(o.model)}ViewSet)

urlpatterns = [path("api/", include(router.urls))]
`,
  },

  {
    id: "fastapi-crud",
    category: "CRUD",
    language: "FastAPI",
    title: "FastAPI CRUD (SQLAlchemy + Pydantic)",
    description: "Complete async CRUD with SQLAlchemy and Pydantic schemas",
    fileExtension: "py",
    options: [
      { id: "model",  label: "Model Name", type: "text", placeholder: "Item",  default: "Item" },
      { id: "field1", label: "Field 1",    type: "text", placeholder: "title", default: "title" },
      { id: "field2", label: "Field 2",    type: "text", placeholder: "price", default: "price" },
    ],
    generate: (o) => `# main.py
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.orm import declarative_base, Session, sessionmaker
from pydantic import BaseModel
from typing import Optional

DATABASE_URL = "sqlite:///./app.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ── Model ────────────────────────────────────────────────
class ${cap(o.model)}(Base):
    __tablename__ = "${plural(snake(o.model))}"
    id = Column(Integer, primary_key=True, index=True)
    ${snake(o.field1)} = Column(String, nullable=False)
    ${snake(o.field2)} = Column(Float, nullable=False)

Base.metadata.create_all(bind=engine)

# ── Schemas ──────────────────────────────────────────────
class ${cap(o.model)}Base(BaseModel):
    ${snake(o.field1)}: str
    ${snake(o.field2)}: float

class ${cap(o.model)}Create(${cap(o.model)}Base):
    pass

class ${cap(o.model)}Update(BaseModel):
    ${snake(o.field1)}: Optional[str] = None
    ${snake(o.field2)}: Optional[float] = None

class ${cap(o.model)}Out(${cap(o.model)}Base):
    id: int
    model_config = {"from_attributes": True}

# ── Dependency ───────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

# ── Routes ───────────────────────────────────────────────
@app.post("/${plural(snake(o.model))}/", response_model=${cap(o.model)}Out, status_code=201)
def create_${snake(o.model)}(payload: ${cap(o.model)}Create, db: Session = Depends(get_db)):
    obj = ${cap(o.model)}(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@app.get("/${plural(snake(o.model))}/", response_model=list[${cap(o.model)}Out])
def list_${plural(snake(o.model))}(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return db.query(${cap(o.model)}).offset(skip).limit(limit).all()

@app.get("/${plural(snake(o.model))}/{${snake(o.model)}_id}", response_model=${cap(o.model)}Out)
def get_${snake(o.model)}(${snake(o.model)}_id: int, db: Session = Depends(get_db)):
    obj = db.get(${cap(o.model)}, ${snake(o.model)}_id)
    if not obj:
        raise HTTPException(status_code=404, detail="${cap(o.model)} not found")
    return obj

@app.patch("/${plural(snake(o.model))}/{${snake(o.model)}_id}", response_model=${cap(o.model)}Out)
def update_${snake(o.model)}(${snake(o.model)}_id: int, payload: ${cap(o.model)}Update, db: Session = Depends(get_db)):
    obj = db.get(${cap(o.model)}, ${snake(o.model)}_id)
    if not obj:
        raise HTTPException(status_code=404, detail="${cap(o.model)} not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@app.delete("/${plural(snake(o.model))}/{${snake(o.model)}_id}", status_code=204)
def delete_${snake(o.model)}(${snake(o.model)}_id: int, db: Session = Depends(get_db)):
    obj = db.get(${cap(o.model)}, ${snake(o.model)}_id)
    if not obj:
        raise HTTPException(status_code=404, detail="${cap(o.model)} not found")
    db.delete(obj); db.commit()
`,
  },

  {
    id: "nodejs-crud",
    category: "CRUD",
    language: "Node.js",
    title: "Node.js CRUD (Prisma)",
    description: "Full CRUD operations using Prisma ORM with async/await",
    fileExtension: "js",
    options: [
      { id: "model",  label: "Model Name", type: "text", placeholder: "User",  default: "User" },
      { id: "field1", label: "Field 1",    type: "text", placeholder: "name",  default: "name" },
      { id: "field2", label: "Field 2",    type: "text", placeholder: "email", default: "email" },
    ],
    generate: (o) => `// prisma/schema.prisma
// model ${cap(o.model)} {
//   id        Int      @id @default(autoincrement())
//   ${snake(o.field1)}   String
//   ${snake(o.field2)}   String   @unique
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ── CREATE ────────────────────────────────────────────────
async function create${cap(o.model)}(data) {
  return prisma.${lower(o.model)}.create({ data });
}

// ── READ ONE ──────────────────────────────────────────────
async function get${cap(o.model)}ById(id) {
  return prisma.${lower(o.model)}.findUnique({ where: { id } });
}

// ── READ ALL ──────────────────────────────────────────────
async function getAll${cap(o.model)}s(skip = 0, take = 20) {
  return prisma.${lower(o.model)}.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });
}

// ── UPDATE ────────────────────────────────────────────────
async function update${cap(o.model)}(id, data) {
  return prisma.${lower(o.model)}.update({ where: { id }, data });
}

// ── DELETE ────────────────────────────────────────────────
async function delete${cap(o.model)}(id) {
  return prisma.${lower(o.model)}.delete({ where: { id } });
}

module.exports = { create${cap(o.model)}, get${cap(o.model)}ById, getAll${cap(o.model)}s, update${cap(o.model)}, delete${cap(o.model)} };
`,
  },

  {
    id: "express-crud",
    category: "CRUD",
    language: "Express",
    title: "Express.js CRUD Routes",
    description: "RESTful CRUD routes with Express Router and Mongoose",
    fileExtension: "js",
    options: [
      { id: "model",  label: "Model Name", type: "text", placeholder: "Post",  default: "Post" },
      { id: "field1", label: "Field 1",    type: "text", placeholder: "title", default: "title" },
      { id: "field2", label: "Field 2",    type: "text", placeholder: "body",  default: "body" },
    ],
    generate: (o) => `// models/${lower(o.model)}.model.js
const mongoose = require("mongoose");

const ${lower(o.model)}Schema = new mongoose.Schema(
  {
    ${snake(o.field1)}: { type: String, required: true, trim: true },
    ${snake(o.field2)}: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("${cap(o.model)}", ${lower(o.model)}Schema);

// ─────────────────────────────────────────────────────────
// routes/${plural(lower(o.model))}.routes.js
const express = require("express");
const router = express.Router();
const ${cap(o.model)} = require("../models/${lower(o.model)}.model");

// CREATE
router.post("/", async (req, res) => {
  try {
    const doc = await ${cap(o.model)}.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const docs = await ${cap(o.model)}
    .find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(docs);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const doc = await ${cap(o.model)}.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: "${cap(o.model)} not found" });
  res.json(doc);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const doc = await ${cap(o.model)}.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!doc) return res.status(404).json({ error: "${cap(o.model)} not found" });
  res.json(doc);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const doc = await ${cap(o.model)}.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: "${cap(o.model)} not found" });
  res.status(204).end();
});

module.exports = router;
`,
  },

  {
    id: "laravel-crud",
    category: "CRUD",
    language: "Laravel",
    title: "Laravel CRUD (Eloquent + Resource Controller)",
    description: "Model, Migration, Resource Controller and API routes",
    fileExtension: "php",
    options: [
      { id: "model",  label: "Model Name", type: "text", placeholder: "Article", default: "Article" },
      { id: "field1", label: "Field 1",    type: "text", placeholder: "title",   default: "title" },
      { id: "field2", label: "Field 2",    type: "text", placeholder: "content", default: "content" },
    ],
    generate: (o) => `<?php
// ── Migration ─────────────────────────────────────────────
// database/migrations/xxxx_create_${plural(snake(o.model))}_table.php
Schema::create("${plural(snake(o.model))}", function (Blueprint $table) {
    $table->id();
    $table->string("${snake(o.field1)}");
    $table->text("${snake(o.field2)}");
    $table->timestamps();
});

// ── Model ─────────────────────────────────────────────────
// app/Models/${cap(o.model)}.php
namespace App\\Models;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;

class ${cap(o.model)} extends Model {
    use HasFactory;
    protected $fillable = ["${snake(o.field1)}", "${snake(o.field2)}"];
}

// ── Controller ────────────────────────────────────────────
// app/Http/Controllers/${cap(o.model)}Controller.php
namespace App\\Http\\Controllers;
use App\\Models\\${cap(o.model)};
use Illuminate\\Http\\Request;

class ${cap(o.model)}Controller extends Controller {
    public function index() {
        return ${cap(o.model)}::latest()->paginate(20);
    }
    public function store(Request $request) {
        $data = $request->validate([
            "${snake(o.field1)}" => "required|string|max:255",
            "${snake(o.field2)}" => "required|string",
        ]);
        return response()->json(${cap(o.model)}::create($data), 201);
    }
    public function show(${cap(o.model)} $${lower(o.model)}) {
        return $${lower(o.model)};
    }
    public function update(Request $request, ${cap(o.model)} $${lower(o.model)}) {
        $${lower(o.model)}->update($request->validated());
        return $${lower(o.model)};
    }
    public function destroy(${cap(o.model)} $${lower(o.model)}) {
        $${lower(o.model)}->delete();
        return response()->noContent();
    }
}

// ── API Routes ────────────────────────────────────────────
// routes/api.php
Route::apiResource("${plural(snake(o.model))}", ${cap(o.model)}Controller::class);
`,
  },

  {
    id: "rails-crud",
    category: "CRUD",
    language: "Rails",
    title: "Ruby on Rails CRUD (API mode)",
    description: "Rails API controller with strong params and JSON responses",
    fileExtension: "rb",
    options: [
      { id: "model",  label: "Model Name", type: "text", placeholder: "Article", default: "Article" },
      { id: "field1", label: "Field 1",    type: "text", placeholder: "title",   default: "title" },
      { id: "field2", label: "Field 2",    type: "text", placeholder: "body",    default: "body" },
    ],
    generate: (o) => `# ── Migration ─────────────────────────────────────────────
# db/migrate/xxxx_create_${plural(snake(o.model))}.rb
class Create${cap(o.model)}s < ActiveRecord::Migration[7.1]
  def change
    create_table :${plural(snake(o.model))} do |t|
      t.string  :${snake(o.field1)}, null: false
      t.text    :${snake(o.field2)}, null: false
      t.timestamps
    end
  end
end

# ── Model ─────────────────────────────────────────────────
# app/models/${snake(o.model)}.rb
class ${cap(o.model)} < ApplicationRecord
  validates :${snake(o.field1)}, presence: true
  validates :${snake(o.field2)}, presence: true
  scope :recent, -> { order(created_at: :desc) }
end

# ── Controller ────────────────────────────────────────────
# app/controllers/api/v1/${plural(snake(o.model))}_controller.rb
module Api::V1
  class ${cap(o.model)}sController < ApplicationController
    before_action :set_${snake(o.model)}, only: [:show, :update, :destroy]

    def index
      render json: ${cap(o.model)}.recent.page(params[:page]).per(20)
    end

    def show
      render json: @${snake(o.model)}
    end

    def create
      @${snake(o.model)} = ${cap(o.model)}.new(${snake(o.model)}_params)
      if @${snake(o.model)}.save
        render json: @${snake(o.model)}, status: :created
      else
        render json: { errors: @${snake(o.model)}.errors }, status: :unprocessable_entity
      end
    end

    def update
      if @${snake(o.model)}.update(${snake(o.model)}_params)
        render json: @${snake(o.model)}
      else
        render json: { errors: @${snake(o.model)}.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      @${snake(o.model)}.destroy
      head :no_content
    end

    private

    def set_${snake(o.model)}
      @${snake(o.model)} = ${cap(o.model)}.find(params[:id])
    end

    def ${snake(o.model)}_params
      params.require(:${snake(o.model)}).permit(:${snake(o.field1)}, :${snake(o.field2)})
    end
  end
end

# ── Routes ────────────────────────────────────────────────
# config/routes.rb
# namespace :api do
#   namespace :v1 do
#     resources :${plural(snake(o.model))}
#   end
# end
`,
  },

  // ───────────────────── AUTHENTICATION ────────────────────────────────────

  {
    id: "python-auth",
    category: "Authentication",
    language: "Python",
    title: "Python JWT Authentication",
    description: "JWT creation, verification and protected route decorator",
    fileExtension: "py",
    options: [
      { id: "secret",   label: "Secret Key", type: "text", placeholder: "your-secret-key", default: "your-secret-key" },
      { id: "expire",   label: "Token Expires (minutes)", type: "select", choices: ["15","30","60","120","1440"], default: "60" },
      { id: "algorithm",label: "Algorithm", type: "select", choices: ["HS256","HS384","HS512","RS256"], default: "HS256" },
    ],
    generate: (o) => `# pip install PyJWT bcrypt

import jwt
import bcrypt
from datetime import datetime, timedelta, timezone
from functools import wraps

SECRET_KEY = "${o.secret}"
ALGORITHM  = "${o.algorithm}"
ACCESS_TOKEN_EXPIRE_MINUTES = ${o.expire}

# ── Password Hashing ──────────────────────────────────────
def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())

# ── Token Creation ────────────────────────────────────────
def create_access_token(data: dict) -> str:
    payload = data.copy()
    expire  = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# ── Token Verification ────────────────────────────────────
def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")

# ── Decorator ─────────────────────────────────────────────
def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        from flask import request, jsonify  # works with Flask
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing token"}), 401
        token = auth_header.split(" ")[1]
        try:
            payload = decode_token(token)
            request.user = payload
        except ValueError as e:
            return jsonify({"error": str(e)}), 401
        return f(*args, **kwargs)
    return decorated
`,
  },

  {
    id: "django-auth",
    category: "Authentication",
    language: "Django",
    title: "Django JWT Auth (SimpleJWT)",
    description: "Login, refresh and protected view using djangorestframework-simplejwt",
    fileExtension: "py",
    options: [
      { id: "user_field", label: "Username Field", type: "select", choices: ["username","email"], default: "email" },
      { id: "expire",     label: "Access Token Lifetime (minutes)", type: "select", choices: ["5","15","30","60"], default: "30" },
    ],
    generate: (o) => `# pip install djangorestframework-simplejwt

# settings.py
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

from datetime import timedelta
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME":  timedelta(minutes=${o.expire}),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS":  True,
    "AUTH_HEADER_TYPES":      ("Bearer",),
}

# urls.py
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import ProtectedView

urlpatterns = [
    path("api/auth/login/",   TokenObtainPairView.as_view()),
    path("api/auth/refresh/", TokenRefreshView.as_view()),
    path("api/auth/verify/",  TokenVerifyView.as_view()),
    path("api/me/",           ProtectedView.as_view()),
]

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "user": request.user.${o.user_field},
            "message": "You are authenticated!",
        })
`,
  },

  {
    id: "fastapi-auth",
    category: "Authentication",
    language: "FastAPI",
    title: "FastAPI OAuth2 JWT Auth",
    description: "Complete OAuth2 password flow with JWT tokens and protected routes",
    fileExtension: "py",
    options: [
      { id: "secret",  label: "Secret Key",  type: "text",   placeholder: "supersecretkey", default: "supersecretkey" },
      { id: "expire",  label: "Token Expires (minutes)", type: "select", choices: ["15","30","60","120"], default: "30" },
    ],
    generate: (o) => `# pip install "fastapi[all]" python-jose[cryptography] passlib[bcrypt]

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta

SECRET_KEY  = "${o.secret}"
ALGORITHM   = "HS256"
EXPIRE_MINS = ${o.expire}

pwd_ctx = CryptContext(schemes=["bcrypt"])
oauth2  = OAuth2PasswordBearer(tokenUrl="/token")
app     = FastAPI()

# ── Fake DB ───────────────────────────────────────────────
fake_db = {
    "alice": {"username": "alice", "hashed_password": pwd_ctx.hash("secret")}
}

class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    username: str

def authenticate_user(username: str, password: str):
    user = fake_db.get(username)
    if not user or not pwd_ctx.verify(password, user["hashed_password"]):
        return None
    return user

def create_token(data: dict) -> str:
    payload = data | {"exp": datetime.utcnow() + timedelta(minutes=EXPIRE_MINS)}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if not username:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        return User(username=username)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

@app.post("/token", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form.username, form.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect credentials")
    return Token(access_token=create_token({"sub": user["username"]}), token_type="bearer")

@app.get("/users/me", response_model=User)
async def me(current_user: User = Depends(get_current_user)):
    return current_user
`,
  },

  {
    id: "nodejs-auth",
    category: "Authentication",
    language: "Node.js",
    title: "Node.js JWT Auth",
    description: "Login endpoint, JWT middleware, and protected route",
    fileExtension: "js",
    options: [
      { id: "secret",  label: "JWT Secret",  type: "text",   placeholder: "my-secret-key", default: "my-secret-key" },
      { id: "expire",  label: "Expires In",  type: "select", choices: ["15m","1h","2h","7d","30d"], default: "1h" },
    ],
    generate: (o) => `// npm install jsonwebtoken bcryptjs

const jwt     = require("jsonwebtoken");
const bcrypt  = require("bcryptjs");

const JWT_SECRET  = "${o.secret}";
const JWT_EXPIRES = "${o.expire}";

// ── Hash & Verify ─────────────────────────────────────────
const hashPassword   = (plain)  => bcrypt.hash(plain, 10);
const verifyPassword = (plain, hash) => bcrypt.compare(plain, hash);

// ── Token Helpers ─────────────────────────────────────────
const signToken   = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
const verifyToken = (token)   => jwt.verify(token, JWT_SECRET);

// ── Middleware ────────────────────────────────────────────
function authenticate(req, res, next) {
  const header = req.headers["authorization"] || "";
  const token  = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ── Example Express Routes ────────────────────────────────
const express = require("express");
const router  = express.Router();

// Fake user store — replace with DB lookup
const users = [];

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username))
    return res.status(409).json({ error: "User already exists" });
  const hashed = await hashPassword(password);
  users.push({ id: users.length + 1, username, password: hashed });
  res.status(201).json({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await verifyPassword(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });
  const token = signToken({ id: user.id, username: user.username });
  res.json({ access_token: token, token_type: "bearer" });
});

router.get("/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
`,
  },

  {
    id: "laravel-auth",
    category: "Authentication",
    language: "Laravel",
    title: "Laravel API Auth (Sanctum)",
    description: "API token authentication with Laravel Sanctum",
    fileExtension: "php",
    options: [
      { id: "guard", label: "Auth Guard", type: "select", choices: ["sanctum","passport"], default: "sanctum" },
    ],
    generate: (o) => `<?php
// composer require laravel/sanctum
// php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
// php artisan migrate

// app/Models/User.php — add HasApiTokens trait
use Laravel\\Sanctum\\HasApiTokens;
class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable;
}

// ── Controller ────────────────────────────────────────────
// app/Http/Controllers/AuthController.php
namespace App\\Http\\Controllers;
use App\\Models\\User;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Hash;
use Illuminate\\Validation\\ValidationException;

class AuthController extends Controller {
    public function register(Request $request) {
        $data = $request->validate([
            "name"     => "required|string|max:255",
            "email"    => "required|email|unique:users",
            "password" => "required|string|min:8|confirmed",
        ]);
        $user  = User::create([...$data, "password" => Hash::make($data["password"])]);
        $token = $user->createToken("api-token")->plainTextToken;
        return response()->json(["token" => $token], 201);
    }

    public function login(Request $request) {
        $request->validate([
            "email"    => "required|email",
            "password" => "required",
        ]);
        $user = User::where("email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages(["email" => ["Invalid credentials"]]);
        }
        $user->tokens()->delete(); // revoke old tokens
        return response()->json(["token" => $user->createToken("api-token")->plainTextToken]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(["message" => "Logged out"]);
    }

    public function me(Request $request) {
        return response()->json($request->user());
    }
}

// ── Routes ────────────────────────────────────────────────
// routes/api.php
Route::post("/register", [AuthController::class, "register"]);
Route::post("/login",    [AuthController::class, "login"]);
Route::middleware("auth:${o.guard}")->group(function () {
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::get("/me",      [AuthController::class, "me"]);
});
`,
  },

  // ───────────────────── FILE HANDLING ─────────────────────────────────────

  {
    id: "python-file",
    category: "File Handling",
    language: "Python",
    title: "Python File Handling",
    description: "Read, write, append, delete and list files with error handling",
    fileExtension: "py",
    options: [
      { id: "encoding", label: "Encoding", type: "select", choices: ["utf-8","utf-16","ascii","latin-1"], default: "utf-8" },
    ],
    generate: (o) => `import os
import json
from pathlib import Path

ENCODING = "${o.encoding}"

# ── Read ──────────────────────────────────────────────────
def read_file(path: str) -> str:
    with open(path, "r", encoding=ENCODING) as f:
        return f.read()

def read_json(path: str) -> dict:
    with open(path, "r", encoding=ENCODING) as f:
        return json.load(f)

# ── Write ─────────────────────────────────────────────────
def write_file(path: str, content: str) -> None:
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding=ENCODING) as f:
        f.write(content)

def write_json(path: str, data: dict, indent: int = 2) -> None:
    write_file(path, json.dumps(data, indent=indent, ensure_ascii=False))

# ── Append ────────────────────────────────────────────────
def append_file(path: str, content: str) -> None:
    with open(path, "a", encoding=ENCODING) as f:
        f.write(content)

# ── Delete ────────────────────────────────────────────────
def delete_file(path: str) -> bool:
    try:
        os.remove(path)
        return True
    except FileNotFoundError:
        return False

# ── List Files ────────────────────────────────────────────
def list_files(directory: str, extension: str = "") -> list[str]:
    p = Path(directory)
    pattern = f"*{extension}" if extension else "*"
    return [str(f) for f in p.glob(pattern) if f.is_file()]

# ── Copy / Move ───────────────────────────────────────────
import shutil
copy_file = shutil.copy2
move_file = shutil.move
`,
  },

  {
    id: "nodejs-file",
    category: "File Handling",
    language: "Node.js",
    title: "Node.js File Handling",
    description: "Async file operations using fs/promises",
    fileExtension: "js",
    options: [
      { id: "encoding", label: "Encoding", type: "select", choices: ["utf-8","utf-16","ascii","latin1"], default: "utf-8" },
    ],
    generate: (o) => `const fs   = require("fs/promises");
const path = require("path");

const ENCODING = "${o.encoding}";

// ── Read ──────────────────────────────────────────────────
async function readFile(filePath) {
  return fs.readFile(filePath, ENCODING);
}

async function readJSON(filePath) {
  const raw = await readFile(filePath);
  return JSON.parse(raw);
}

// ── Write ─────────────────────────────────────────────────
async function writeFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, ENCODING);
}

async function writeJSON(filePath, data, indent = 2) {
  await writeFile(filePath, JSON.stringify(data, null, indent));
}

// ── Append ────────────────────────────────────────────────
async function appendFile(filePath, content) {
  await fs.appendFile(filePath, content, ENCODING);
}

// ── Delete ────────────────────────────────────────────────
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") return false;
    throw err;
  }
}

// ── List Files ────────────────────────────────────────────
async function listFiles(dir, ext = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter(e => e.isFile() && (!ext || e.name.endsWith(ext)))
    .map(e => path.join(dir, e.name));
}

// ── Copy / Move ───────────────────────────────────────────
async function copyFile(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
}
async function moveFile(src, dest) {
  await copyFile(src, dest);
  await deleteFile(src);
}

module.exports = { readFile, readJSON, writeFile, writeJSON, appendFile, deleteFile, listFiles, copyFile, moveFile };
`,
  },

  {
    id: "express-upload",
    category: "File Handling",
    language: "Express",
    title: "Express File Upload (Multer)",
    description: "Single and multiple file uploads with validation and storage config",
    fileExtension: "js",
    options: [
      { id: "dest",     label: "Upload Destination", type: "text",   placeholder: "uploads/", default: "uploads/" },
      { id: "maxsize",  label: "Max File Size (MB)",  type: "select", choices: ["1","5","10","25","50"], default: "5" },
      { id: "types",    label: "Allowed File Types",  type: "select", choices: ["images only","any","pdf+images","documents"], default: "images only" },
    ],
    generate: (o) => {
      const mimeMap: Record<string,string> = {
        "images only": "image/jpeg|image/png|image/gif|image/webp",
        "any": ".*",
        "pdf+images": "image/.*|application/pdf",
        "documents": "application/pdf|application/msword|application/vnd.openxmlformats.*",
      };
      return `// npm install multer

const multer = require("multer");
const path   = require("path");
const fs     = require("fs");

// ── Storage Config ────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("${o.dest}", { recursive: true });
    cb(null, "${o.dest}");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /${mimeMap[o.types]}/;
  cb(null, allowed.test(file.mimetype));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: ${o.maxsize} * 1024 * 1024 }, // ${o.maxsize} MB
});

// ── Routes ────────────────────────────────────────────────
const express = require("express");
const router  = express.Router();

// Single file
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded or invalid type" });
  res.json({ message: "Uploaded successfully", file: req.file.filename });
});

// Multiple files (max 10)
router.post("/upload-many", upload.array("files", 10), (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: "No files uploaded" });
  res.json({ count: req.files.length, files: req.files.map(f => f.filename) });
});

module.exports = router;
`;
    },
  },

  // ───────────────────── API CALLS ─────────────────────────────────────────

  {
    id: "python-api",
    category: "API Calls",
    language: "Python",
    title: "Python HTTP Client (httpx)",
    description: "Async HTTP GET, POST, PUT, DELETE with error handling",
    fileExtension: "py",
    options: [
      { id: "baseurl", label: "Base URL",    type: "text",   placeholder: "https://api.example.com", default: "https://api.example.com" },
      { id: "auth",    label: "Auth Type",   type: "select", choices: ["Bearer Token","API Key Header","Basic Auth","None"], default: "Bearer Token" },
    ],
    generate: (o) => {
      const authCode: Record<string,string> = {
        "Bearer Token": `    headers["Authorization"] = f"Bearer {api_token}"`,
        "API Key Header": `    headers["X-API-Key"] = api_key`,
        "Basic Auth":     `    import base64\n    creds = base64.b64encode(f"{username}:{password}".encode()).decode()\n    headers["Authorization"] = f"Basic {creds}"`,
        "None": `    pass  # no auth`,
      };
      return `# pip install httpx

import httpx
from typing import Any

BASE_URL  = "${o.baseurl}"
TIMEOUT   = 30  # seconds

def get_default_headers() -> dict:
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    ${authCode[o.auth]}
    return headers

async def get(endpoint: str, params: dict = None) -> Any:
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=TIMEOUT) as client:
        resp = await client.get(endpoint, params=params, headers=get_default_headers())
        resp.raise_for_status()
        return resp.json()

async def post(endpoint: str, data: dict) -> Any:
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=TIMEOUT) as client:
        resp = await client.post(endpoint, json=data, headers=get_default_headers())
        resp.raise_for_status()
        return resp.json()

async def put(endpoint: str, data: dict) -> Any:
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=TIMEOUT) as client:
        resp = await client.put(endpoint, json=data, headers=get_default_headers())
        resp.raise_for_status()
        return resp.json()

async def delete(endpoint: str) -> bool:
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=TIMEOUT) as client:
        resp = await client.delete(endpoint, headers=get_default_headers())
        resp.raise_for_status()
        return resp.status_code == 204

# ── Usage ─────────────────────────────────────────────────
# import asyncio
# asyncio.run(get("/users"))
# asyncio.run(post("/users", {"name": "Alice", "email": "alice@example.com"}))
`;
    },
  },

  {
    id: "nodejs-api",
    category: "API Calls",
    language: "Node.js",
    title: "Node.js HTTP Client (axios)",
    description: "Axios API client with interceptors, retry and error handling",
    fileExtension: "js",
    options: [
      { id: "baseurl", label: "Base URL",  type: "text",   placeholder: "https://api.example.com", default: "https://api.example.com" },
      { id: "timeout", label: "Timeout (ms)", type: "select", choices: ["5000","10000","15000","30000"], default: "10000" },
    ],
    generate: (o) => `// npm install axios

const axios = require("axios");

const api = axios.create({
  baseURL: "${o.baseurl}",
  timeout: ${o.timeout},
  headers: {
    "Content-Type": "application/json",
    "Accept":       "application/json",
  },
});

// ── Request Interceptor (attach token) ────────────────────
api.interceptors.request.use(
  (config) => {
    const token = process.env.API_TOKEN; // or from localStorage in browser
    if (token) config.headers.Authorization = \`Bearer \${token}\`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor (handle errors globally) ─────────
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized — refresh token or redirect to login");
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// ── Helper Methods ────────────────────────────────────────
const get    = (url, params) => api.get(url, { params });
const post   = (url, data)   => api.post(url, data);
const put    = (url, data)   => api.put(url, data);
const patch  = (url, data)   => api.patch(url, data);
const del    = (url)         => api.delete(url);

module.exports = { api, get, post, put, patch, del };

// ── Usage ─────────────────────────────────────────────────
// const { get, post } = require("./api");
// const users = await get("/users", { page: 1, limit: 10 });
// const user  = await post("/users", { name: "Alice" });
`,
  },

  // ───────────────────── VALIDATION ────────────────────────────────────────

  {
    id: "fastapi-validation",
    category: "Validation",
    language: "FastAPI",
    title: "FastAPI Pydantic Validation",
    description: "Pydantic v2 models with field validators and custom error messages",
    fileExtension: "py",
    options: [
      { id: "model",  label: "Schema Name", type: "text", placeholder: "UserCreate", default: "UserCreate" },
      { id: "field1", label: "Field 1 (string)", type: "text", placeholder: "username", default: "username" },
      { id: "field2", label: "Field 2 (string)", type: "text", placeholder: "email",    default: "email" },
    ],
    generate: (o) => `from pydantic import BaseModel, EmailStr, field_validator, model_validator
from typing import Optional
import re

class ${cap(o.model)}(BaseModel):
    ${snake(o.field1)}: str
    ${snake(o.field2)}: EmailStr
    password:  str
    password2: str
    age: Optional[int] = None

    @field_validator("${snake(o.field1)}")
    @classmethod
    def validate_${snake(o.field1)}(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 3:
            raise ValueError("${cap(o.field1)} must be at least 3 characters")
        if not re.match(r"^[a-zA-Z0-9_]+$", v):
            raise ValueError("${cap(o.field1)} may only contain letters, numbers and underscores")
        return v.lower()

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one digit")
        return v

    @model_validator(mode="after")
    def passwords_match(self) -> "${cap(o.model)}":
        if self.password != self.password2:
            raise ValueError("Passwords do not match")
        return self

    @field_validator("age")
    @classmethod
    def validate_age(cls, v: Optional[int]) -> Optional[int]:
        if v is not None and (v < 0 or v > 150):
            raise ValueError("Age must be between 0 and 150")
        return v

# ── Usage ─────────────────────────────────────────────────
# from fastapi import FastAPI, HTTPException
# app = FastAPI()
# @app.post("/register")
# def register(payload: ${cap(o.model)}):
#     return {"user": payload.${snake(o.field1)}}
`,
  },

  {
    id: "nodejs-validation",
    category: "Validation",
    language: "Node.js",
    title: "Node.js Validation (Zod)",
    description: "Zod schema validation with TypeScript support and Express middleware",
    fileExtension: "js",
    options: [
      { id: "schema",  label: "Schema Name", type: "text", placeholder: "UserSchema", default: "UserSchema" },
      { id: "field1",  label: "Field 1",     type: "text", placeholder: "username",   default: "username" },
      { id: "field2",  label: "Field 2",     type: "text", placeholder: "email",      default: "email" },
    ],
    generate: (o) => `// npm install zod

const { z } = require("zod");

// ── Schema Definition ─────────────────────────────────────
const ${o.schema} = z.object({
  ${snake(o.field1)}: z
    .string()
    .min(3, "${cap(o.field1)} must be at least 3 characters")
    .max(50, "${cap(o.field1)} must be at most 50 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores allowed")
    .transform((v) => v.toLowerCase()),

  ${snake(o.field2)}: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),

  age: z.number().int().min(0).max(150).optional(),
});

// ── Type export (TypeScript) ──────────────────────────────
// type ${o.schema}Type = z.infer<typeof ${o.schema}>;

// ── Parse & Validate ──────────────────────────────────────
function validate${o.schema}(data) {
  const result = ${o.schema}.safeParse(data);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}

// ── Express Middleware ────────────────────────────────────
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error:  "Validation failed",
        fields: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data; // replace with parsed data
    next();
  };
}

module.exports = { ${o.schema}, validate${o.schema}, validate };

// ── Usage ─────────────────────────────────────────────────
// router.post("/register", validate(${o.schema}), async (req, res) => { ... });
`,
  },

  // ───────────────────── PAGINATION ────────────────────────────────────────

  {
    id: "django-pagination",
    category: "Pagination",
    language: "Django",
    title: "Django DRF Pagination",
    description: "Page-number and cursor pagination with DRF",
    fileExtension: "py",
    options: [
      { id: "pagesize",  label: "Page Size",  type: "select", choices: ["10","20","50","100"], default: "20" },
      { id: "type",      label: "Pagination Type", type: "select", choices: ["Page Number","Cursor","Limit Offset"], default: "Page Number" },
    ],
    generate: (o) => {
      const classMap: Record<string,string> = {
        "Page Number":  "PageNumberPagination",
        "Cursor":       "CursorPagination",
        "Limit Offset": "LimitOffsetPagination",
      };
      const cls = classMap[o.type];
      const extra = o.type === "Cursor"
        ? `    ordering = "-created_at"  # field to order by`
        : o.type === "Limit Offset"
        ? `    max_limit = ${Number(o.pagesize) * 5}`
        : `    page_query_param = "page"\n    page_size_query_param = "page_size"\n    max_page_size = ${Number(o.pagesize) * 5}`;
      return `# settings.py
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.${cls}",
    "PAGE_SIZE": ${o.pagesize},
}

# ── Custom Paginator ──────────────────────────────────────
from rest_framework.pagination import ${cls}
from rest_framework.response import Response

class Standard${cls}(${cls}):
    page_size = ${o.pagesize}
${extra}

    def get_paginated_response(self, data):
        return Response({
            "count":    self.${o.type === "Limit Offset" ? "count" : "page.paginator.count"},
            "next":     self.get_next_link(),
            "previous": self.get_previous_link(),
            "results":  data,
        })

# ── Usage in ViewSet ──────────────────────────────────────
# class MyModelViewSet(viewsets.ModelViewSet):
#     pagination_class = Standard${cls}
#     queryset         = MyModel.objects.all()
#     serializer_class = MyModelSerializer
`;
    },
  },

  {
    id: "fastapi-pagination",
    category: "Pagination",
    language: "FastAPI",
    title: "FastAPI Pagination (offset/limit)",
    description: "Reusable pagination dependency with metadata response",
    fileExtension: "py",
    options: [
      { id: "pagesize", label: "Default Page Size", type: "select", choices: ["10","20","50","100"], default: "20" },
      { id: "maxsize",  label: "Max Page Size",      type: "select", choices: ["50","100","200","500"], default: "100" },
    ],
    generate: (o) => `from fastapi import FastAPI, Depends, Query
from pydantic import BaseModel
from typing import TypeVar, Generic, Optional
from math import ceil

T = TypeVar("T")

class Page(BaseModel, Generic[T]):
    items:   list[T]
    total:   int
    page:    int
    size:    int
    pages:   int
    has_next: bool
    has_prev: bool

class PaginationParams:
    def __init__(
        self,
        page:  int = Query(1,  ge=1, description="Page number"),
        size:  int = Query(${o.pagesize}, ge=1, le=${o.maxsize}, description="Items per page"),
    ):
        self.page   = page
        self.size   = size
        self.offset = (page - 1) * size

def paginate(items_total: int, items: list, params: PaginationParams) -> Page:
    pages = ceil(items_total / params.size) if items_total else 1
    return Page(
        items    = items,
        total    = items_total,
        page     = params.page,
        size     = params.size,
        pages    = pages,
        has_next = params.page < pages,
        has_prev = params.page > 1,
    )

# ── Example Route ─────────────────────────────────────────
app = FastAPI()

@app.get("/items/", response_model=Page[dict])
async def list_items(
    pagination: PaginationParams = Depends(PaginationParams),
    db = None,  # replace with real DB session
):
    # total = await db.count()
    # items = await db.offset(pagination.offset).limit(pagination.size).all()
    total = 100  # example
    items = [{"id": i} for i in range(pagination.offset, pagination.offset + pagination.size)]
    return paginate(total, items, pagination)
`,
  },

  {
    id: "nodejs-pagination",
    category: "Pagination",
    language: "Node.js",
    title: "Node.js Pagination Helper",
    description: "Reusable pagination utility for Mongoose and Prisma",
    fileExtension: "js",
    options: [
      { id: "pagesize", label: "Default Page Size", type: "select", choices: ["10","20","50","100"], default: "20" },
    ],
    generate: (o) => `// ── Pagination Helper ─────────────────────────────────────
function getPaginationParams(query = {}) {
  const page  = Math.max(1, parseInt(query.page)  || 1);
  const limit = Math.min(100, parseInt(query.limit) || ${o.pagesize});
  const skip  = (page - 1) * limit;
  return { page, limit, skip };
}

function buildPaginationMeta(total, page, limit) {
  const pages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    pages,
    hasNext: page < pages,
    hasPrev: page > 1,
  };
}

// ── Mongoose Helper ───────────────────────────────────────
async function paginateMongoose(Model, filter = {}, { page, limit, skip }, projection = {}) {
  const [total, items] = await Promise.all([
    Model.countDocuments(filter),
    Model.find(filter, projection).sort({ createdAt: -1 }).skip(skip).limit(limit),
  ]);
  return { items, meta: buildPaginationMeta(total, page, limit) };
}

// ── Prisma Helper ─────────────────────────────────────────
async function paginatePrisma(model, where = {}, { page, limit, skip }, orderBy = { createdAt: "desc" }) {
  const [total, items] = await Promise.all([
    model.count({ where }),
    model.findMany({ where, skip, take: limit, orderBy }),
  ]);
  return { items, meta: buildPaginationMeta(total, page, limit) };
}

// ── Express Route Example ─────────────────────────────────
// router.get("/items", async (req, res) => {
//   const params = getPaginationParams(req.query);
//   const { items, meta } = await paginateMongoose(Item, {}, params);
//   res.json({ data: items, meta });
// });

module.exports = { getPaginationParams, buildPaginationMeta, paginateMongoose, paginatePrisma };
`,
  },

  // ───────────────────── DATABASE ──────────────────────────────────────────

  {
    id: "python-database",
    category: "Database",
    language: "Python",
    title: "Python SQLAlchemy Queries",
    description: "Common ORM query patterns: filter, join, aggregate",
    fileExtension: "py",
    options: [
      { id: "model",  label: "Model Name", type: "text", placeholder: "User", default: "User" },
      { id: "field1", label: "Filter Field", type: "text", placeholder: "email", default: "email" },
    ],
    generate: (o) => `from sqlalchemy.orm import Session
from sqlalchemy import func, and_, or_, desc
from .models import ${cap(o.model)}

# ── Basic Queries ─────────────────────────────────────────
def query_examples(db: Session):

    # Get by primary key
    obj = db.get(${cap(o.model)}, 1)

    # Filter
    results = db.query(${cap(o.model)}).filter(${cap(o.model)}.${snake(o.field1)} == "value").all()

    # Multiple conditions (AND)
    results = db.query(${cap(o.model)}).filter(
        and_(${cap(o.model)}.${snake(o.field1)} == "value", ${cap(o.model)}.id > 5)
    ).all()

    # OR condition
    results = db.query(${cap(o.model)}).filter(
        or_(${cap(o.model)}.${snake(o.field1)} == "a", ${cap(o.model)}.${snake(o.field1)} == "b")
    ).all()

    # LIKE search
    results = db.query(${cap(o.model)}).filter(
        ${cap(o.model)}.${snake(o.field1)}.ilike("%search%")
    ).all()

    # Order by
    results = db.query(${cap(o.model)}).order_by(desc(${cap(o.model)}.id)).limit(20).all()

    # Count
    count = db.query(func.count(${cap(o.model)}.id)).scalar()

    # Aggregation
    avg = db.query(func.avg(${cap(o.model)}.id)).scalar()

    # Pagination
    page, per_page = 1, 20
    results = db.query(${cap(o.model)}).offset((page - 1) * per_page).limit(per_page).all()

    # Exists
    exists = db.query(${cap(o.model)}).filter(${cap(o.model)}.${snake(o.field1)} == "value").first() is not None

    return results
`,
  },

  {
    id: "django-database",
    category: "Database",
    language: "Django",
    title: "Django ORM Query Patterns",
    description: "Common Django ORM queries: filter, annotate, aggregate, Q objects",
    fileExtension: "py",
    options: [
      { id: "model",  label: "Model Name", type: "text", placeholder: "Article", default: "Article" },
      { id: "field1", label: "Filter Field", type: "text", placeholder: "status", default: "status" },
    ],
    generate: (o) => `from django.db.models import Q, Count, Avg, Sum, Max, Min, F
from .models import ${cap(o.model)}

# ── Filter Queries ────────────────────────────────────────
qs = ${cap(o.model)}.objects.all()

# Basic filter
qs.filter(${snake(o.field1)}="active")

# Q objects for OR / complex conditions
qs.filter(Q(${snake(o.field1)}="active") | Q(${snake(o.field1)}="pending"))

# Exclude
qs.exclude(${snake(o.field1)}="deleted")

# icontains (case-insensitive LIKE)
qs.filter(${snake(o.field1)}__icontains="search_term")

# In list
qs.filter(id__in=[1, 2, 3])

# Range
qs.filter(created_at__date__range=["2024-01-01", "2024-12-31"])

# ── Aggregation ───────────────────────────────────────────
from django.db.models import Count
${cap(o.model)}.objects.aggregate(
    total=Count("id"),
    avg_id=Avg("id"),
)

# ── Annotation ────────────────────────────────────────────
${cap(o.model)}.objects.annotate(num_related=Count("related_set"))

# ── F Expressions (DB-level operations) ──────────────────
${cap(o.model)}.objects.update(views=F("views") + 1)

# ── Select Related / Prefetch ─────────────────────────────
${cap(o.model)}.objects.select_related("author").prefetch_related("tags")

# ── Raw SQL ───────────────────────────────────────────────
${cap(o.model)}.objects.raw("SELECT * FROM ${plural(snake(o.model))} WHERE ${snake(o.field1)} = %s", ["value"])

# ── Bulk Create ───────────────────────────────────────────
${cap(o.model)}.objects.bulk_create([
    ${cap(o.model)}(${snake(o.field1)}="a"),
    ${cap(o.model)}(${snake(o.field1)}="b"),
])

# ── Ordering & Slicing (Pagination) ──────────────────────
${cap(o.model)}.objects.order_by("-created_at")[0:20]
`,
  },
];

// ─── Query helpers ────────────────────────────────────────────────────────────

export function getSnippetsByCategory(category: CodeCategory): Snippet[] {
  return snippets.filter((s) => s.category === category);
}

export function getLanguagesForCategory(category: CodeCategory): Language[] {
  const langs = snippets
    .filter((s) => s.category === category)
    .map((s) => s.language);
  return [...new Set(langs)];
}

export function getSnippet(category: CodeCategory, language: Language): Snippet | undefined {
  return snippets.find((s) => s.category === category && s.language === language);
}
