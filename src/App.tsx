import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

// Santander
import { SantanderHome } from './pages/SantanderHome';
import { SantanderPix } from './pages/SantanderPix';
import { SantanderTransfer } from './pages/SantanderTransfer';
import { SantanderPaymentMethod } from './pages/SantanderPaymentMethod';
import { SantanderReceipt } from './pages/SantanderReceipt';

// Nubank
import { AppProvider as NubankAppProvider } from './context/NubankAppContext';
import { NubankSplash } from './pages/NubankSplash';
import { NubankDashboard } from './pages/NubankDashboard';
import { NubankPixFlow } from './pages/NubankPixFlow';
import { NubankTransferValue } from './pages/NubankTransferValue';
import { NubankStatement } from './pages/NubankStatement';
import { NubankPayment } from './pages/NubankPayment';
import { NubankCards } from './pages/NubankCards';
import { NubankLoan } from './pages/NubankLoan';
import { NubankRecharge } from './pages/NubankRecharge';
import { NubankInvest } from './pages/NubankInvest';
import { NubankBoxes } from './pages/NubankBoxes';
import { NubankShopping } from './pages/NubankShopping';
import { NubankHelp } from './pages/NubankHelp';
import { NubankProfile } from './pages/NubankProfile';

// Inter
import { InterBalanceProvider } from './context/InterBalanceContext';
import { InterSplash } from './pages/InterSplash';
import { InterDashboard } from './pages/InterDashboard';
import { InterPixFlow } from './pages/InterPixFlow';
import { InterCards } from './pages/InterCards';
import { InterPayment } from './pages/InterPayment';
import { InterStatement } from './pages/InterStatement';
import { InterInvestments } from './pages/InterInvestments';
import { InterShopping } from './pages/InterShopping';
import { InterProfile } from './pages/InterProfile';
import { InterAllServices } from './pages/InterAllServices';
import { InterLoan } from './pages/InterLoan';
import { InterTravel } from './pages/InterTravel';
import { InterGenericFeature } from './pages/InterGenericFeature';

// Mercado Pago
import { MPBankProvider } from './context/MPBankContext';
import { MPSplash } from './pages/MPSplash';
import { MPDashboard } from './pages/MPDashboard';
import { MPPixFlow } from './pages/MPPixFlow';
import { MPManagement } from './pages/MPManagement';
import { MPPayments } from './pages/MPPayments';
import { MPMore } from './pages/MPMore';

// Itaú
import { ItauProvider } from './context/ItauContext';
import ItauSplash from './pages/ItauSplash';
import ItauDashboard from './pages/ItauDashboard';
import ItauPixArea from './pages/ItauPixArea';
import ItauPixTransfer from './pages/ItauPixTransfer';
import ItauPixAmount from './pages/ItauPixAmount';

// Bradesco
import { BradescoProvider } from './context/BradescoContext';
import BradescoSplash from './pages/BradescoSplash';
import BradescoDashboard from './pages/BradescoDashboard';
import BradescoPixTransfer from './pages/BradescoPixTransfer';
import BradescoPixAmount from './pages/BradescoPixAmount';

import { AnimatePresence } from 'framer-motion';
import { NotificationProvider } from './context/NotificationContext';
import { NotificationOverlay } from './components/NotificationOverlay';

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-[100dvh] w-full bg-[#f0f2f5] flex justify-center items-center sm:py-10">
      <div className="w-full sm:max-w-[400px] h-[100dvh] sm:h-[850px] bg-white sm:rounded-[30px] shadow-2xl relative overflow-hidden flex flex-col">
        <NotificationOverlay />
        <div className="w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              
              {/* Santander Routes */}
              <Route path="/santander" element={<SantanderHome />} />
              <Route path="/santander/pix" element={<SantanderPix />} />
              <Route path="/santander/pix/transfer" element={<SantanderTransfer />} />
              <Route path="/santander/pix/payment" element={<SantanderPaymentMethod />} />
              <Route path="/santander/receipt" element={<SantanderReceipt />} />

              {/* Nubank Routes */}
              <Route path="/nubank" element={<NubankSplash />} />
              <Route path="/nubank/dashboard" element={<NubankDashboard />} />
              <Route path="/nubank/pix" element={<NubankPixFlow />} />
              <Route path="/nubank/pix/transfer" element={<NubankTransferValue />} />
              <Route path="/nubank/statement" element={<NubankStatement />} />
              <Route path="/nubank/payment" element={<NubankPayment />} />
              <Route path="/nubank/cards" element={<NubankCards />} />
              <Route path="/nubank/loan" element={<NubankLoan />} />
              <Route path="/nubank/recharge" element={<NubankRecharge />} />
              <Route path="/nubank/invest" element={<NubankInvest />} />
              <Route path="/nubank/boxes" element={<NubankBoxes />} />
              <Route path="/nubank/shopping" element={<NubankShopping />} />
              <Route path="/nubank/help" element={<NubankHelp />} />
              <Route path="/nubank/profile" element={<NubankProfile />} />

              {/* Inter Routes */}
              <Route path="/inter" element={<InterSplash />} />
              <Route path="/inter/home" element={<InterDashboard />} />
              <Route path="/inter/pix" element={<InterPixFlow />} />
              <Route path="/inter/cards" element={<InterCards />} />
              <Route path="/inter/payment" element={<InterPayment />} />
              <Route path="/inter/extrato" element={<InterStatement />} />
              <Route path="/inter/investimentos" element={<InterInvestments />} />
              <Route path="/inter/shopping" element={<InterShopping />} />
              <Route path="/inter/perfil" element={<InterProfile />} />
              <Route path="/inter/todos-os-servicos" element={<InterAllServices />} />
              <Route path="/inter/emprestimo/:type" element={<InterLoan />} />
              <Route path="/inter/viagens" element={<InterTravel />} />
              <Route path="/inter/feature/:name" element={<InterGenericFeature />} />

              {/* Mercado Pago Routes */}
              <Route path="/mp" element={<MPSplash />} />
              <Route path="/mp/dashboard" element={<MPDashboard />} />
              <Route path="/mp/pix" element={<MPPixFlow />} />
              <Route path="/mp/management" element={<MPManagement />} />
              <Route path="/mp/payments" element={<MPPayments />} />
              <Route path="/mp/more" element={<MPMore />} />

              {/* Itaú Routes */}
              <Route path="/itau" element={<ItauSplash />} />
              <Route path="/itau/dashboard" element={<ItauDashboard />} />
              <Route path="/itau/pix" element={<ItauPixArea />} />
              <Route path="/itau/pix/transfer" element={<ItauPixTransfer />} />
              <Route path="/itau/pix/amount" element={<ItauPixAmount />} />

              {/* Bradesco Routes */}
              <Route path="/bradesco" element={<BradescoSplash />} />
              <Route path="/bradesco/dashboard" element={<BradescoDashboard />} />
              <Route path="/bradesco/pix" element={<BradescoPixTransfer />} />
              <Route path="/bradesco/pix/amount" element={<BradescoPixAmount />} />

            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <ItauProvider>
        <NubankAppProvider>
          <InterBalanceProvider>
            <MPBankProvider>
              <BradescoProvider>
                <AppContent />
              </BradescoProvider>
            </MPBankProvider>
          </InterBalanceProvider>
        </NubankAppProvider>
      </ItauProvider>
    </NotificationProvider>
  );
}

export default App;
