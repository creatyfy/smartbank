import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, UserPlus, BarChart2, LogOut, Search, 
  ShieldAlert, Clock, UserX, UserCheck,
  Plus, Ban, RotateCcw, Eye, EyeOff, Copy, CheckCircle2,
  TrendingUp, AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { 
  addDaysToUser, toggleBlockUser, revokeAccess, createUser 
} from '../lib/admin';
import { cn } from '../lib/cn';

type Tab = 'users' | 'create' | 'stats';
type FilterStatus = 'all' | 'active' | 'expired' | 'blocked';

export function Admin() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [modalUser, setModalUser] = useState<any>(null);
  const [daysToAdd, setDaysToAdd] = useState(30);

  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newDays, setNewDays] = useState(30);
  const [newIsAdmin, setNewIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createResult, setCreateResult] = useState<{email: string, pass: string} | null>(null);

  const loadUsers = async () => {
    setLoadingUsers(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      setUsers(data || []);
    } catch (err: any) {
      setError('Erro ao carregar dados do banco: ' + err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/'); 
        return; 
      }

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profile?.is_admin) {
        setAccessDenied(true);
        return;
      }

      setIsAdmin(true);
      await loadUsers();
    } catch (err) {
      setAccessDenied(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pass = "";
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(pass);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);

    try {
      const result = await createUser(newEmail, newPassword, newFullName, newDays, newIsAdmin);
      setCreateResult({ email: result.email, pass: result.password });
      await loadUsers();
    } catch (err: any) {
      alert(err.message || 'Erro ao criar usuário no banco');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleAddDays = async () => {
    if (!modalUser) return;

    try {
      await addDaysToUser(modalUser.id, modalUser.access_expires_at, daysToAdd);
      setModalUser(null);
      await loadUsers();
    } catch (err) {
      alert('Erro ao atualizar dias no banco');
    }
  };

  const handleToggleBlock = async (user: any) => {
    const action = user.is_blocked ? 'desbloquear' : 'bloquear';
    if (window.confirm(`Deseja realmente ${action} o usuário ${user.email}?`)) {
      try {
        await toggleBlockUser(user.id, !user.is_blocked);
        await loadUsers();
      } catch (err) {
        alert('Erro ao atualizar status no banco');
      }
    }
  };

  const handleRevoke = async (user: any) => {
    if (window.confirm(`Deseja revogar o acesso de ${user.email} imediatamente?`)) {
      try {
        await revokeAccess(user.id);
        await loadUsers();
      } catch (err) {
        alert('Erro ao revogar acesso no banco');
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-[#1a1a2e] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="w-full h-full bg-[#1a1a2e] flex flex-col items-center justify-center p-8 text-center">
        <ShieldAlert className="w-20 h-20 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Acesso Negado</h1>
        <p className="text-gray-400 mb-8">Esta conta não possui privilégios de administrador no banco de dados.</p>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Voltar ao Login</button>
      </div>
    );
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(search.toLowerCase()) || 
                         (u.full_name && u.full_name.toLowerCase().includes(search.toLowerCase()));
    const now = new Date();
    const expiry = u.access_expires_at ? new Date(u.access_expires_at) : null;
    const isExpired = expiry && expiry < now;
    const isActive = !u.is_blocked && (!u.access_expires_at || new Date(u.access_expires_at) > now);

    if (filterStatus === 'active') return matchesSearch && isActive;
    if (filterStatus === 'expired') return matchesSearch && isExpired;
    if (filterStatus === 'blocked') return matchesSearch && u.is_blocked;
    return matchesSearch;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => !u.is_blocked && (!u.access_expires_at || new Date(u.access_expires_at) > new Date())).length,
    expired: users.filter(u => u.access_expires_at && new Date(u.access_expires_at) < new Date()).length,
    blocked: users.filter(u => u.is_blocked).length,
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1a1a2e] text-white overflow-hidden font-sans relative">
      <header className="bg-[#16213e] px-6 py-4 flex items-center justify-between shadow-lg shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Painel Admin</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
              Smartbank Control
            </p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <LogOut className="w-5 h-5 text-gray-400" />
        </button>
      </header>

      <nav className="bg-[#16213e] border-t border-white/10 flex shrink-0">
        <button onClick={() => setActiveTab('users')} className={cn("flex-1 py-4 flex flex-col items-center gap-1 transition-all", activeTab === 'users' ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-500")}>
          <Users className="w-5 h-5" /><span className="text-[10px] font-bold uppercase">Usuários</span>
        </button>
        <button onClick={() => setActiveTab('create')} className={cn("flex-1 py-4 flex flex-col items-center gap-1 transition-all", activeTab === 'create' ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-500")}>
          <UserPlus className="w-5 h-5" /><span className="text-[10px] font-bold uppercase">Criar</span>
        </button>
        <button onClick={() => setActiveTab('stats')} className={cn("flex-1 py-4 flex flex-col items-center gap-1 transition-all", activeTab === 'stats' ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-500")}>
          <BarChart2 className="w-5 h-5" /><span className="text-[10px] font-bold uppercase">Stats</span>
        </button>
      </nav>

      <main className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-[11px] text-red-200 leading-tight">{error}</p>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Buscar por e-mail ou nome..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#0f3460] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 transition-all" />
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {(['all', 'active', 'expired', 'blocked'] as FilterStatus[]).map((s) => (
                <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all", filterStatus === s ? "bg-blue-600 text-white" : "bg-[#0f3460] text-gray-400 border border-white/5")}>
                  {s === 'all' ? 'Todos' : s === 'active' ? 'Ativos' : s === 'expired' ? 'Expirados' : 'Bloqueados'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {loadingUsers ? (
                <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
              ) : filteredUsers.length === 0 ? (
                <p className="text-center text-gray-500 py-10 text-sm italic">Nenhum usuário cadastrado ainda.</p>
              ) : filteredUsers.map((u) => {
                const now = new Date();
                const expiry = u.access_expires_at ? new Date(u.access_expires_at) : null;
                const isExpired = expiry && expiry < now;
                const diff = expiry ? expiry.getTime() - now.getTime() : null;
                const daysLeft = diff ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : null;

                return (
                  <div key={u.id} className="bg-[#0f3460] rounded-2xl p-4 border border-white/5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="max-w-[70%]">
                        <p className="font-bold text-sm truncate">{u.email}</p>
                        <p className="text-xs text-gray-400 truncate">{u.full_name || 'Sem nome'}</p>
                      </div>
                      <div className={cn("px-2 py-0.5 rounded text-[9px] font-black uppercase", u.is_blocked ? "bg-red-500/20 text-red-400 border border-red-500/30" : isExpired ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-green-500/20 text-green-400 border border-green-500/30")}>
                        {u.is_blocked ? 'Bloqueado' : isExpired ? 'Expirado' : 'Ativo'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-4">
                      <Clock className="w-3 h-3" />
                      <span>Expira em: {expiry ? expiry.toLocaleDateString('pt-BR') : 'Sem prazo'}</span>
                      {daysLeft !== null && <span className={cn("font-bold", daysLeft > 7 ? "text-green-400" : daysLeft > 0 ? "text-yellow-400" : "text-red-400")}>({daysLeft} dias)</span>}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => setModalUser(u)} className="bg-green-600/20 text-green-400 border border-green-600/30 py-2 rounded-lg text-[10px] font-bold uppercase flex items-center justify-center gap-1"><Plus className="w-3 h-3" /> Dias</button>
                      <button onClick={() => handleToggleBlock(u)} className={cn("py-2 rounded-lg text-[10px] font-bold uppercase flex items-center justify-center gap-1", u.is_blocked ? "bg-blue-600/20 text-blue-400 border border-blue-600/30" : "bg-red-600/20 text-red-400 border border-red-600/30")}>
                        {u.is_blocked ? <UserCheck className="w-3 h-3" /> : <Ban className="w-3 h-3" />}{u.is_blocked ? 'Liberar' : 'Bloquear'}
                      </button>
                      <button onClick={() => handleRevoke(u)} className="bg-gray-600/20 text-gray-400 border border-gray-600/30 py-2 rounded-lg text-[10px] font-bold uppercase flex items-center justify-center gap-1"><RotateCcw className="w-3 h-3" /> Revogar</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="max-w-md mx-auto">
            {!createResult ? (
              <form onSubmit={handleCreateUser} className="bg-[#0f3460] rounded-3xl p-6 border border-white/5 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center"><UserPlus className="w-5 h-5 text-blue-400" /></div>
                  <h2 className="font-bold text-lg">Novo Usuário</h2>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">E-mail de acesso</label>
                  <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full bg-[#16213e] border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-blue-500 transition-all" placeholder="exemplo@email.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Senha</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-[#16213e] border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-blue-500 transition-all pr-24" placeholder="••••••••" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 text-gray-400">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                      <button type="button" onClick={generatePassword} className="bg-blue-600 text-[10px] font-black px-2 py-1 rounded uppercase">Gerar</button>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nome Completo</label>
                  <input type="text" value={newFullName} onChange={(e) => setNewFullName(e.target.value)} className="w-full bg-[#16213e] border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-blue-500 transition-all" placeholder="Nome do cliente" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Dias de Acesso</label>
                    <input type="number" min="1" value={newDays} onChange={(e) => setNewDays(parseInt(e.target.value))} className="w-full bg-[#16213e] border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Tipo de Conta</label>
                    <button type="button" onClick={() => setNewIsAdmin(!newIsAdmin)} className={cn("w-full py-3 rounded-xl border flex items-center justify-center gap-2 transition-all", newIsAdmin ? "bg-purple-600/20 border-purple-500 text-purple-400" : "bg-[#16213e] border-white/10 text-gray-400")}><span className="text-xs font-bold uppercase">{newIsAdmin ? 'Admin' : 'Usuário'}</span></button>
                  </div>
                </div>
                <button type="submit" disabled={createLoading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 uppercase tracking-widest text-sm">{createLoading ? 'Processando...' : 'Criar Conta'}</button>
              </form>
            ) : (
              <div className="bg-green-900/20 border border-green-500/30 rounded-3xl p-8 text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20"><CheckCircle2 className="w-10 h-10 text-white" /></div>
                <h2 className="text-xl font-bold text-white mb-2">Usuário Criado!</h2>
                <p className="text-green-400 text-sm mb-8">A conta foi registrada com sucesso no banco de dados.</p>
                <div className="space-y-3 mb-8">
                  <div onClick={() => { navigator.clipboard.writeText(createResult.email); alert('E-mail copiado!'); }} className="bg-[#16213e] p-4 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer active:bg-white/5"><div className="text-left"><p className="text-[10px] font-bold text-gray-500 uppercase">E-mail</p><p className="font-mono text-blue-400">{createResult.email}</p></div><Copy className="w-4 h-4 text-gray-500" /></div>
                  <div onClick={() => { navigator.clipboard.writeText(createResult.pass); alert('Senha copiada!'); }} className="bg-[#16213e] p-4 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer active:bg-white/5"><div className="text-left"><p className="text-[10px] font-bold text-gray-500 uppercase">Senha</p><p className="font-mono text-blue-400">{createResult.pass}</p></div><Copy className="w-4 h-4 text-gray-500" /></div>
                </div>
                <button onClick={() => { setCreateResult(null); setNewEmail(''); setNewPassword(''); }} className="w-full bg-white text-black font-black py-4 rounded-2xl uppercase tracking-widest text-sm">Criar Outro</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0f3460] p-4 rounded-2xl border border-white/5"><Users className="w-5 h-5 text-blue-400 mb-2" /><p className="text-2xl font-black">{stats.total}</p><p className="text-[10px] font-bold text-gray-400 uppercase">Total Contas</p></div>
              <div className="bg-green-900/20 p-4 rounded-2xl border border-green-500/20"><UserCheck className="w-5 h-5 text-green-400 mb-2" /><p className="text-2xl font-black text-green-400">{stats.active}</p><p className="text-[10px] font-bold text-gray-400 uppercase">Ativos</p></div>
              <div className="bg-yellow-900/20 p-4 rounded-2xl border border-yellow-500/20"><Clock className="w-5 h-5 text-yellow-400 mb-2" /><p className="text-2xl font-black text-yellow-400">{stats.expired}</p><p className="text-[10px] font-bold text-gray-400 uppercase">Expirados</p></div>
              <div className="bg-red-900/20 p-4 rounded-2xl border border-red-500/20"><UserX className="w-5 h-5 text-red-400 mb-2" /><p className="text-2xl font-black text-red-400">{stats.blocked}</p><p className="text-[10px] font-bold text-gray-400 uppercase">Bloqueados</p></div>
            </div>
            <div className="bg-[#0f3460] p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-bold uppercase text-gray-400 mb-4">Proporção da Base</h3>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden flex">
                <div style={{ width: `${(stats.active / (stats.total || 1)) * 100}%` }} className="h-full bg-green-500"></div>
                <div style={{ width: `${(stats.expired / (stats.total || 1)) * 100}%` }} className="h-full bg-yellow-500"></div>
                <div style={{ width: `${(stats.blocked / (stats.total || 1)) * 100}%` }} className="h-full bg-red-500"></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {modalUser && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-[#16213e] w-full max-w-xs rounded-3xl p-6 border border-white/10 shadow-2xl">
            <h3 className="font-bold text-lg mb-1">Adicionar Acesso</h3>
            <p className="text-xs text-gray-400 mb-6 truncate">Para: {modalUser.email}</p>
            <div className="space-y-4">
              <input type="number" value={daysToAdd} onChange={(e) => setDaysToAdd(parseInt(e.target.value))} className="w-full bg-[#0f3460] border border-white/10 rounded-xl py-4 px-4 text-center text-2xl font-black outline-none focus:border-blue-500" />
              <div className="grid grid-cols-2 gap-2">
                {[7, 15, 30, 90].map(d => (
                  <button key={d} onClick={() => setDaysToAdd(d)} className={cn("py-2 rounded-lg text-[10px] font-bold uppercase border transition-all", daysToAdd === d ? "bg-blue-600 border-blue-500 text-white" : "bg-[#0f3460] border-white/5 text-gray-400")}>+{d} Dias</button>
                ))}
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setModalUser(null)} className="flex-1 py-3 text-xs font-bold text-gray-500 uppercase">Cancelar</button>
                <button onClick={handleAddDays} className="flex-1 bg-blue-600 py-3 rounded-xl text-xs font-black uppercase shadow-lg shadow-blue-600/20">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
