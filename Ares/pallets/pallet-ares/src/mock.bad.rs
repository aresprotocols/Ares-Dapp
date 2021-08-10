use crate as pallet_ares;
// use frame_support::{impl_outer_origin, parameter_types, weights::Weight};
// use frame_system as system;
// use sp_core::H256;
// use sp_runtime::{
//     Perbill, testing::Header, traits::{BlakeTwo256, IdentityLookup},
// };

use crate as pallet_template;
use sp_core::H256;
use frame_support::parameter_types;
use sp_runtime::{
    traits::{BlakeTwo256, IdentityLookup}, testing::Header,
};
use frame_system as system;

type UncheckedExtrinsic = frame_system::mocking::MockUncheckedExtrinsic<Test>;
type Block = frame_system::mocking::MockBlock<Test>;


// use crate::{Module};
use pallet_ares::{Module, Config};

//TODO::重定义了？哪儿？
// impl_outer_origin! {
// 	pub enum Origin for Test {}
// }

// Configure a mock runtime to test the pallet.
frame_support::construct_runtime!(
	pub enum Test where
		Block = Block,
		NodeBlock = Block,
		UncheckedExtrinsic = UncheckedExtrinsic,
	{
        System: frame_system::{Module, Call, Config, Storage, Event<T>},
        AresModule: pallet_ares::{Module, Call, Storage, Event<T>},
	}
);

// Configure a mock runtime to test the pallet.
// #[derive(Clone, Eq, PartialEq)]
// pub struct Test;
parameter_types! {
	pub const BlockHashCount: u64 = 250;
	// pub const MaximumBlockWeight: Weight = 1024;
	// pub const MaximumBlockLength: u32 = 2 * 1024;
	pub const AvailableBlockRatio: Perbill = Perbill::from_percent(75);
    // pub const BlockWeights: Weight = 1024;
    // pub const BlockLength: u32 =  2 * 1024;
    pub const SS58Prefix: u8 = 42;
}

impl system::Config for Test {
    type BaseCallFilter = ();
    type Origin = Origin;
    type Call = ();
    type Index = u64;
    type BlockNumber = u64;
    type Hash = H256;
    type Hashing = BlakeTwo256;
    type AccountId = u64;
    type Lookup = IdentityLookup<Self::AccountId>;
    type Header = Header;
    type Event = ();
    type BlockHashCount = BlockHashCount;
    // type MaximumBlockWeight = MaximumBlockWeight;
    type DbWeight = ();
    // type BlockExecutionWeight = ();
    // type ExtrinsicBaseWeight = ();
    // type MaximumExtrinsicWeight = MaximumBlockWeight;
    // type MaximumBlockLength = MaximumBlockLength;
    // type AvailableBlockRatio = AvailableBlockRatio;
    type BlockWeights = ();
    type BlockLength = ();
    type SS58Prefix = SS58Prefix;
    type Version = ();
    type PalletInfo = PalletInfo;
    type AccountData = ();
    type OnNewAccount = ();
    type OnKilledAccount = ();
    type SystemWeightInfo = ();
}

parameter_types! {
	pub const ValidityPeriod: u64 = 10;
	pub const AggregateQueueNum: u32 = 10;
	pub const AggregateInterval: u64 = 15;
}

impl pallet_ares::Config for Test {
    type Event = Event;
    type ValidityPeriod = ValidityPeriod;
    type AggregateQueueNum = AggregateQueueNum;
    type AggregateInterval = AggregateInterval;
}

// pub type AresModule = Module<Test>;

// Build genesis storage according to the mock runtime.
pub fn new_test_ext() -> sp_io::TestExternalities {
    system::GenesisConfig::default().build_storage::<Test>().unwrap().into()
}
