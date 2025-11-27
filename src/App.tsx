import React, { useState, useEffect } from 'react';
import { Plus, X, Pencil, CheckCircle, CircleDashed } from 'lucide-react';

// =================================================================
// 1. Tipos e Dados
// =================================================================

interface MediaItem {
    id: number;
    titulo: string;
    tipo: 'Filme' | 'Série';
    lancamento: number;
    genero: string;
    assistido: boolean;
    capaUrl: string; // <-- OK
}

const INITIAL_MOCK_DATA: MediaItem[] = [
    { 
        id: 1, 
        titulo: "The Crown", 
        tipo: "Série", 
        lancamento: 2016, 
        genero: "Drama Histórico", 
        assistido: true,
        capaUrl: "https://imgs.search.brave.com/WR3Jc6jYAk3cXVVKbM1EN4_QUUKicybcUMioGpA40Wo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mci53/ZWIuaW1nMi5hY3N0/YS5uZXQvY18zMTBf/NDIwL3BpY3R1cmVz/LzIzLzEwLzI2LzEx/LzE3LzA3MTU4Nzgu/anBn"
    },
    { 
        id: 2, 
        titulo: "Oppenheimer", 
        tipo: "Filme", 
        lancamento: 2023, 
        genero: "Biografia/Drama", 
        assistido: true,
        capaUrl: "https://imgs.search.brave.com/wyJAyVgFFEIOh45VltHm2v4NzvqT8DSbgr31o-UmNFg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzErODE1aXkyNkwu/anBn"
    },
    { 
        id: 3, 
        titulo: "Duna: Parte 2", 
        tipo: "Filme", 
        lancamento: 2024, 
        genero: "Ficção Científica", 
        assistido: false,
        capaUrl: "https://imgs.search.brave.com/a0jyWNpJkUECHbhJxkm81xzHcuAbr7g1KYXBCGEBoPk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2FsbHBhcGVyZ2Fw/LmNvbS9jZG4vMjQv/MzMxL2R1bmUtcGhv/bmUtd2FsbHBhcGVy/LTRrLTEwNjV4MTcy/OS5qcGc"
    },
    { 
        id: 4, 
        titulo: "Stranger Things", 
        tipo: "Série", 
        lancamento: 2016, 
        genero: "Ficção Científica/Terror", 
        assistido: true,
        capaUrl: "https://imgs.search.brave.com/3TxN_jfttT3qRy-9hEi9WWtMtmktPWXxmk_QaUqTWe8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC82Lzcv/Ny8xMjUwODYtMTA4/MHgxOTIwLW1vYmls/ZS1mdWxsLWhkLXN0/cmFuZ2VyLXRoaW5n/cy1iYWNrZ3JvdW5k/LmpwZw"
    },
    { 
        id: 5,
        titulo: "A Origem", 
        tipo: "Filme", 
        lancamento: 2010, 
        genero: "Ação/Ficção Científica", 
        assistido: false,
        capaUrl: "https://imgs.search.brave.com/la3QA2Qqmx-6O9JPt-wnrYZvE3bLE4LjuA5nkSpK5WQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jdXJ0/b2ZpbG1lcy5jb20u/YnIvaW1hZ2Vucy9w/b3N0ZXJzL2ZpbG1l/cy9zb2JyZS1vLWZp/bG1lLWEtb3JpZ2Vt/LTcyLndlYnA"
    }
];

// =================================================================
// 2. Componentes (Com estilos inline simplificados)
// =================================================================

// Header
const Header: React.FC = () => (
    <header className="app-header">
        <div className="header-inner">
            <h1 className="header-title">Catálogo DevFlix</h1>
            <span className="header-subtitle">Trabalho CRUD React + JSON Server</span>
        </div>
    </header>
);

// MediaForm COMPLETO
interface MediaFormProps {
    initialData: MediaItem | null;
    onSave: (data: Omit<MediaItem, 'id'>) => void;
    onCancel: () => void;
    isLoading: boolean;
}

const MediaForm: React.FC<MediaFormProps> = ({ initialData, onSave, onCancel, isLoading }) => {
    // Linha 89
    const [formData, setFormData] = useState<Omit<MediaItem, 'id'>>({
        titulo: initialData?.titulo || '',
        tipo: initialData?.tipo || 'Filme',
        lancamento: initialData?.lancamento || new Date().getFullYear(),
        genero: initialData?.genero || '',
        assistido: initialData?.assistido || false,
        capaUrl: initialData?.capaUrl || '', // <-- CORREÇÃO: Adicionando a capaUrl
    });
    // Linha 96

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prevItems => ({ ...prevItems, [name]: name === 'lancamento' ? parseInt(value) || new Date().getFullYear() : value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.titulo || !formData.genero) {
            console.error('Título e Gênero são obrigatórios!');
            return;
        }
        onSave(formData);
    };

    return (
        <div className="form-panel" style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            border: '1px solid #c7d2fe'
        }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#4338ca' }}>{initialData ? 'Editar Item' : 'Novo Item'}</h2>
            <form onSubmit={handleSubmit}>

                {/* Título */}
                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="titulo" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Título</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        style={{ marginTop: '4px', display: 'block', width: '100%', borderRadius: '6px', border: '1px solid #d1d5db', padding: '8px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
                        required
                        disabled={isLoading}
                    />
                </div>

                {/* URL da Imagem de Capa (NOVO CAMPO INSERIDO) */}
                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="capaUrl" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>URL da Imagem de Capa</label>
                    <input
                        type="text"
                        id="capaUrl"
                        name="capaUrl"
                        value={formData.capaUrl}
                        onChange={handleChange}
                        style={{
                            marginTop: '4px',
                            display: 'block',
                            width: '100%',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            padding: '8px',
                            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
                        }}
                        disabled={isLoading}
                    />
                </div>

                {/* Tipo e Gênero (em linha) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                    <div>
                        <label htmlFor="tipo" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Tipo</label>
                        <select
                            id="tipo"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            style={{ marginTop: '4px', display: 'block', width: '100%', borderRadius: '6px', border: '1px solid #d1d5db', padding: '8px', backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
                            disabled={isLoading}
                        >
                            <option value="Filme">Filme</option>
                            <option value="Série">Série</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="genero" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Gênero</label>
                        <input
                            type="text"
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            style={{ marginTop: '4px', display: 'block', width: '100%', borderRadius: '6px', border: '1px solid #d1d5db', padding: '8px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
                            required
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {/* Lançamento e Assistido */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
                    <div>
                        <label htmlFor="lancamento" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Ano de Lançamento</label>
                        <input
                            type="number"
                            id="lancamento"
                            name="lancamento"
                            value={formData.lancamento}
                            onChange={handleChange}
                            style={{ marginTop: '4px', display: 'block', width: '100%', borderRadius: '6px', border: '1px solid #d1d5db', padding: '8px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
                            min="1895"
                            max={new Date().getFullYear() + 5}
                            disabled={isLoading}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '12px' }}>
                        <input
                            type="checkbox"
                            id="assistido"
                            name="assistido"
                            checked={formData.assistido}
                            onChange={handleChange}
                            style={{ width: '16px', height: '16px', color: '#4f46e5', borderRadius: '4px', borderColor: '#d1d5db' }}
                            disabled={isLoading}
                        />
                        <label htmlFor="assistido" style={{ marginLeft: '8px', display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                            Já assisti
                        </label>
                    </div>
                </div>


                {/* Botões */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="cancel-button"
                        style={{ padding: '8px 16px', border: '1px solid #d1d5db', fontSize: '14px', fontWeight: '500', borderRadius: '6px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', color: '#374151', backgroundColor: 'white', cursor: 'pointer' }}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="submit-button"
                        style={{ padding: '8px 16px', border: '1px solid transparent', fontSize: '14px', fontWeight: '500', borderRadius: '6px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', color: 'white', backgroundColor: '#4f46e5', cursor: 'pointer', opacity: isLoading ? 0.5 : 1 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Salvando...' : (initialData ? 'Atualizar' : 'Cadastrar')}
                    </button>
                </div>
            </form>
        </div>
    );
};

// Card de Exibição
const MediaCard: React.FC<any> = ({ item, onEdit, onDelete, isLoading }) => {
    const badgeClass = item.tipo === 'Filme' ? 'badge-filme' : 'badge-serie';
    const statusClass = item.assistido ? 'status-green' : 'status-yellow';

    return (
        <div className="media-card">
            {/* NOVO: Bloco da Imagem - Usa a classe 'card-image-wrapper' para proporção */}
            <div className="card-image-wrapper">
                <img src={item.capaUrl} alt={`Capa de ${item.titulo}`} className="card-image" />
            </div>

            {/* Conteúdo do Card - Usa a classe 'card-content-wrapper' para padding */}
            <div className="card-content-wrapper">

                <div className="card-top">
                    <h3 className="card-title">{item.titulo}</h3>
                    <span className={`card-badge ${badgeClass}`}>
                        {item.tipo}
                    </span>
                </div>

                <p className="card-info">
                    <span style={{ fontWeight: '600' }}>{item.genero}</span> ({item.lancamento})
                </p>

                {/* Status e Ações */}
                <div className="card-actions-row">
                    <div className={`status-text ${statusClass}`}>
                        {item.assistido ? <CheckCircle className="icon-status" /> : <CircleDashed className="icon-status" />}
                        {item.assistido ? 'Assistido' : 'Pendente'}
                    </div>

                    <div className="action-buttons">
                        <button
                            onClick={() => onEdit(item)}
                            className="action-button edit-button"
                            title="Editar"
                            disabled={isLoading}
                        >
                            <Pencil className="icon-action" />
                        </button>
                        <button
                            onClick={() => onDelete(item.id)}
                            className="action-button delete-button"
                            title="Excluir"
                            disabled={isLoading}
                        >
                            <X className="icon-action" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// =================================================================
// 3. Lógica Principal (App.tsx)
// =================================================================

const App: React.FC = () => {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MediaItem | null>(null);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        return new Promise<void>(resolve => {
            setTimeout(() => {
                setItems(INITIAL_MOCK_DATA);

                setLoading(false);
                resolve();
            }, 800);
        });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // --- Funções de API (SIMULAÇÃO CRUD) ---

    // CREATE (POST) e UPDATE (PUT/PATCH) - SIMULAÇÃO
    const handleSave = async (data: Omit<MediaItem, 'id'>) => {
        setLoading(true);
        setError(null);

        // SIMULAÇÃO: Substitui POST/PUT da API.
        return new Promise<void>(resolve => {
            setTimeout(() => {
                setItems((prevItems: MediaItem[]) => {
                    if (editingItem) {
                        // Lógica de Edição (PUT/PATCH)
                        return prevItems.map(item =>
                            item.id === editingItem.id ? { ...data, id: editingItem.id } as MediaItem : item
                        );
                    } else {
                        // Lógica de Cadastro (POST)
                        const newId = Math.max(0, ...prevItems.map(i => i.id)) + 1;
                        const newItem: MediaItem = { ...data, id: newId };
                        return [...prevItems, newItem];
                    }
                });

                setIsFormOpen(false);
                setEditingItem(null);
                setLoading(false);
                resolve();
            }, 800);
        });
    };

    // DELETE - SIMULAÇÃO
    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este item? (Simulação em Memória)')) return;

        setLoading(true);
        setError(null);

        // SIMULAÇÃO: Substitui DELETE da API.
        return new Promise<void>(resolve => {
            setTimeout(() => {
                setItems((prevItems: MediaItem[]) => prevItems.filter(item => item.id !== id));
                setLoading(false);
                resolve();
            }, 500);
        });
    };

    // --- Funções de Estado da UI ---

    const handleEditClick = (item: MediaItem) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleOpenForm = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const handleCancelForm = () => {
        setEditingItem(null);
        setIsFormOpen(false);
    };

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <h2 className="section-title">Meu Catálogo de Mídias ({items.length} itens)</h2>

                {/* Botão de Cadastro e Formulário */}
                <div className="add-button-container">
                    {!isFormOpen && (
                        <button
                            onClick={handleOpenForm}
                            className="add-button"
                            disabled={loading}
                        >
                            <Plus className="icon-plus" />
                            Adicionar Novo Item
                        </button>
                    )}

                    {isFormOpen && (
                        <MediaForm
                            initialData={editingItem}
                            onSave={handleSave}
                            onCancel={handleCancelForm}
                            isLoading={loading}
                        />
                    )}
                </div>

                {/* Feedback do Usuário (Erro) */}
                {error && <div className="error-alert" style={{ backgroundColor: '#fffbe5', border: '1px solid #fcd34d', color: '#b45309', padding: '12px 16px', borderRadius: '6px', position: 'relative', marginBottom: '16px' }} role="alert">
                    <strong style={{ fontWeight: 'bold' }}>Aviso:</strong>
                    <span style={{ display: 'inline-block', marginLeft: '8px' }}>{error}</span>
                </div>}

                {/* Listagem (READ) */}
                {!loading && items.length > 0 && (
                    <div className="card-grid">
                        {items.map(item => (
                            <MediaCard
                                key={item.id}
                                item={item}
                                onEdit={handleEditClick}
                                onDelete={handleDelete}
                                isLoading={loading}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Rodapé */}
            <footer className="app-footer">
                <div className="header-inner">
                    <p className="text-center" style={{ width: '100%' }}>
                        Esta versão opera em MODO DE SIMULAÇÃO (dados em memória) devido a restrições do ambiente.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;