use crate as pallet_ocw;
use codec::{alloc::sync::Arc};
// use sp_core::H256;
use frame_support::{parameter_types, impl_outer_event, impl_outer_origin};
// use sp_runtime::{
//     traits::{BlakeTwo256, IdentityLookup}, testing::Header,
// };
use frame_system::offchain;
use frame_system as system;



type UncheckedExtrinsic = frame_system::mocking::MockUncheckedExtrinsic<Test>;
type Block = frame_system::mocking::MockBlock<Test>;


// -------
// use crate::*;

use parking_lot::RwLock;
use sp_core::{
    crypto,
    H256,
    offchain::{
        OffchainExt,
        testing::{self, OffchainState, PoolState}, TransactionPoolExt,
    },
    sr25519::{self, Signature},
    // testing::KeyStore,
    // traits::KeystoreExt,
};

use sp_keystore::{testing::KeyStore, KeystoreExt};

use sp_io::TestExternalities;
use sp_runtime::{
    Perbill,
    testing::{Header, TestXt},
    traits::{BlakeTwo256, IdentityLookup, Verify, Extrinsic as ExtrinsicT, IdentifyAccount},
};


use crate::*;

// -------

frame_support::construct_runtime!(
	pub enum Test where
		Block = Block,
		NodeBlock = Block,
		UncheckedExtrinsic = UncheckedExtrinsic,
	{
		System: frame_system::{Module, Call, Config, Storage, Event<T>},
        OCWModule: pallet_ocw::{Module, Call, Storage, Event<T>},
	}

);

// #[derive(Clone, Eq, PartialEq)]
// pub struct Test;
parameter_types! {
	pub const BlockHashCount: u64 = 250;
	pub const SS58Prefix: u8 = 42;
	pub const AvailableBlockRatio: Perbill = Perbill::from_percent(75);

}

impl system::Config for Test {
    type BaseCallFilter = ();
    type BlockWeights = ();
    type BlockLength = ();
    type DbWeight = ();
    type Origin = Origin;
    type Call = Call;
    type Index = u64;
    type BlockNumber = u64;
    type Hash = H256;
    type Hashing = BlakeTwo256;
    type AccountId = u64;
    type Lookup = IdentityLookup<Self::AccountId>;
    type Header = Header;
    type Event = Event;
    type BlockHashCount = BlockHashCount;
    type Version = ();
    type PalletInfo = PalletInfo;
    type AccountData = ();
    type OnNewAccount = ();
    type OnKilledAccount = ();
    type SystemWeightInfo = ();
    type SS58Prefix = SS58Prefix;
}

// Create the implementation of the currently tested class

type TestExtrinsic = TestXt<Call, ()>;
type AccountId = <<Signature as Verify>::Signer as IdentifyAccount>::AccountId;

// impl_outer_origin! {
// 	pub enum Origin for Test {}
// }

parameter_types! {
	pub const GracePeriod: u64 = 5;
}

// impl_outer_event! {
// 	pub enum TestEvent for Test {
// 		frame_system<T>,
// 		pallet_ocw<T>,
// 	}
// }

impl pallet_ocw::Config for Test {
    type Event = Event;
    type AuthorityId = pallet_ocw::crypto::TestAuthId;
    type Call = Call;
    type GracePeriod = GracePeriod;
}

// Build genesis storage according to the mock runtime.
pub fn new_test_ext() -> sp_io::TestExternalities {
    system::GenesisConfig::default().build_storage::<Test>().unwrap().into()
}


// Other define.
impl<LocalCall> offchain::CreateSignedTransaction<LocalCall> for Test
    where
        Call: From<LocalCall>,
{
    fn create_transaction<C: offchain::AppCrypto<Self::Public, Self::Signature>>(
        call: Call,
        _public: <Signature as Verify>::Signer,
        _account: <Test as frame_system::Config>::AccountId,
        index: <Test as frame_system::Config>::Index,
    ) -> Option<(
        Call,
        <TestExtrinsic as sp_runtime::traits::Extrinsic>::SignaturePayload,
    )> {
        Some((call, (index, ())))
    }
}

impl offchain::SigningTypes for Test {
    type Public = <Signature as Verify>::Signer;
    type Signature = Signature;
}

// impl frame_system::offchain::SigningTypes for Test {
//     type Public = <Signature as Verify>::Signer;
//     type Signature = Signature;
// }


impl<C> offchain::SendTransactionTypes<C> for Test
    where
        Call: From<C>,
{
    type OverarchingCall = Call;
    type Extrinsic = TestExtrinsic;
}

pub struct ExternalityBuilder;

impl ExternalityBuilder {
    pub fn build() -> (
        TestExternalities,
        Arc<RwLock<PoolState>>,
        Arc<RwLock<OffchainState>>,
    ) {
        const PHRASE: &str =
            "expire stage crawl shell boss any story swamp skull yellow bamboo copy";

        let (offchain, offchain_state) = testing::TestOffchainExt::new();
        let (pool, pool_state) = testing::TestTransactionPoolExt::new();
        let keystore = KeyStore::new();
        keystore
            .write()
            .sr25519_generate_new(KEY_TYPE, Some(&format!("{}/hunter1", PHRASE)))
            .unwrap();

        let storage = frame_system::GenesisConfig::default()
            .build_storage::<Test>()
            .unwrap();

        let mut t = TestExternalities::from(storage);
        t.register_extension(OffchainExt::new(offchain));
        t.register_extension(TransactionPoolExt::new(pool));
        t.register_extension(KeystoreExt(keystore));
        t.execute_with(|| System::set_block_number(1));
        (t, pool_state, offchain_state)
    }
}