import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:5173';

// ─── Helper ──────────────────────────────────────────────────────

async function fillPhase1(page, { serviceType, companyType }: { serviceType: 'pm' | 'po'; companyType: 'Public' | 'Private' | 'Other' }) {
  // Should see Phase 1 hub
  await expect(page.getByText('Getting Started')).toBeVisible();

  // ── Legal & Compliance ──
  await page.getByText('Legal & Compliance').click();
  await expect(page.getByText('Legal & Compliance').first()).toBeVisible();
  // Agree to terms
  await page.getByText('I agree to the').click();
  await page.getByText('Save & Return to Checklist').click();
  await expect(page.getByText('Getting Started')).toBeVisible();

  // ── Service Type ──
  await page.getByText('Service Type').click();
  await expect(page.getByText('How will you use Lithic?')).toBeVisible();
  if (serviceType === 'pm') {
    await page.getByText('Program Managed').click();
  } else {
    await page.getByText('Processor Only').click();
  }
  await page.getByText('Save & Return to Checklist').click();
  await expect(page.getByText('Getting Started')).toBeVisible();

  // ── Industries ──
  await page.getByText('Industries').click();
  await expect(page.getByText("What You're Building")).toBeVisible();
  await page.getByText('Save & Return to Checklist').click();
  await expect(page.getByText('Getting Started')).toBeVisible();

  // ── Business Details ──
  await page.getByText('Business Details', { exact: false }).last().click();
  await expect(page.getByRole('heading', { name: 'Business Details' })).toBeVisible();
  await page.fill('#businessName', 'Acme Corp');
  await page.fill('#taxId', '123456789');
  await page.fill('#website', 'www.acme.com');
  await page.getByText(companyType, { exact: true }).click();
  await page.getByText('Save & Return to Checklist').click();
  await expect(page.getByText('Getting Started')).toBeVisible();

  // All sections complete → Continue
  await page.getByText('Continue to Next Phase').click();
}

// ─── Tests ───────────────────────────────────────────────────────

test.describe('Phase 1 Hub', () => {
  test('renders hub with 4 sections', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.getByText('Getting Started')).toBeVisible();
    await expect(page.getByText('Legal & Compliance')).toBeVisible();
    await expect(page.getByText('Service Type')).toBeVisible();
    await expect(page.getByText('Industries')).toBeVisible();
    // Business Details section card
    await expect(page.getByText('Basic company information')).toBeVisible();
    // Continue should be disabled
    await expect(page.getByText('Continue to Next Phase')).toBeDisabled();
  });

  test('can navigate into and out of each section', async ({ page }) => {
    await page.goto(BASE);
    // Navigate into Legal
    await page.getByText('Legal & Compliance').click();
    await expect(page.getByText('Before we begin')).toBeVisible();
    // Back button in header
    await page.getByText('Back').click();
    await expect(page.getByText('Getting Started')).toBeVisible();
  });
});

test.describe('Path A: PM + Private', () => {
  test('full flow through Phase 2', async ({ page }) => {
    await page.goto(BASE);
    await fillPhase1(page, { serviceType: 'pm', companyType: 'Private' });

    // Phase 2 hub for PM
    await expect(page.getByText('Program Managed Details')).toBeVisible();
    // Should show: Business Details 2, Control Persons, Beneficial Owners, Financial Docs, Contacts
    await expect(page.getByText('Additional Business Details')).toBeVisible();
    await expect(page.getByText('Control Persons')).toBeVisible();
    await expect(page.getByText('Beneficial Owners')).toBeVisible();
    await expect(page.getByText('Financial Documents')).toBeVisible();
    await expect(page.getByText('Contacts', { exact: true }).first()).toBeVisible();

    // ── Business Details 2 ──
    await page.getByText('Additional Business Details').click();
    await expect(page.getByRole('heading', { name: 'Additional Business Details' })).toBeVisible();
    // Should show address fields for private
    await expect(page.locator('#bd2Country')).toBeVisible();
    await expect(page.locator('#bd2Street')).toBeVisible();
    await page.locator('#bd2Country').selectOption('United States');
    await page.fill('#bd2Street', '123 Main St');
    await page.fill('#bd2City', 'New York');
    await page.locator('#bd2State').selectOption('New York');
    await page.fill('#bd2Zip', '10001');
    await page.fill('#bd2Employees', '50');
    await page.fill('#bd2Naics', '522320');
    await page.getByText('Save & Return to Checklist').click();

    // ── Control Persons ──
    await page.getByText('Control Persons').click();
    await expect(page.getByRole('heading', { name: 'Control Persons' })).toBeVisible();
    // Add a control person
    await page.getByText('Add Control Person').click();
    // Should see the person card
    await expect(page.getByText('Control Person').nth(1)).toBeVisible();
    // Click Fill In Details
    await page.getByText('Fill In Details').click();
    // Should see the person details form
    await expect(page.getByRole('heading', { name: 'Control Person Details' })).toBeVisible();
    // Should show citizenship fields for PM-Private
    await expect(page.getByText('Citizenship Status')).toBeVisible();
    // Fill in minimal required fields
    await page.locator('#pdCountry').selectOption('United States');
    await page.getByText('US Citizen', { exact: true }).click();
    await page.fill('#pdSsn', '123-45-6789');
    await page.fill('#pdFirstName', 'John');
    await page.fill('#pdLastName', 'Doe');
    await page.fill('#pdDob', '01/01/1980');
    await page.fill('#pdAddress', '456 Oak Ave');
    await page.fill('#pdCity', 'New York');
    await page.locator('#pdState').selectOption('New York');
    await page.fill('#pdZip', '10001');
    await page.fill('#pdPhone', '555-123-4567');
    await page.fill('#pdEmail', 'john@acme.com');
    await page.fill('#pdTitle', 'CEO');
    await page.getByText('Save').click();
    // Back to person list
    await page.getByText('Save & Return to Checklist').click();

    // ── Beneficial Owners ──
    await page.getByText('Beneficial Owners').click();
    await expect(page.getByRole('heading', { name: 'Beneficial Owners' })).toBeVisible();
    await page.getByText('Add Beneficial Owner').click();
    await page.getByText('Fill In Details').click();
    await expect(page.getByRole('heading', { name: 'Beneficial Owner Details' })).toBeVisible();
    // Should show ownership % for BOs
    await expect(page.locator('#pdOwnership')).toBeVisible();
    await page.fill('#pdOwnership', '50');
    await page.locator('#pdCountry').selectOption('United States');
    await page.getByText('US Citizen', { exact: true }).click();
    await page.fill('#pdSsn', '987-65-4321');
    await page.fill('#pdFirstName', 'Jane');
    await page.fill('#pdLastName', 'Smith');
    await page.fill('#pdDob', '05/15/1985');
    await page.fill('#pdAddress', '789 Elm St');
    await page.fill('#pdCity', 'New York');
    await page.locator('#pdState').selectOption('New York');
    await page.fill('#pdZip', '10002');
    await page.fill('#pdPhone', '555-987-6543');
    await page.fill('#pdEmail', 'jane@acme.com');
    await page.fill('#pdTitle', 'CFO');
    await page.getByText('Save').click();
    await page.getByText('Save & Return to Checklist').click();

    // ── Financial Docs ──
    await page.getByText('Financial Documents').click();
    await expect(page.getByRole('heading', { name: 'Financial Documents' })).toBeVisible();
    await expect(page.getByText("Last 3 Months' Bank Statements")).toBeVisible();
    await expect(page.getByText("Last 12 Months' Financial Statements")).toBeVisible();
    // Skip uploading files for now, just go back
    await page.getByText('Save & Return to Checklist').click();

    // ── Contacts ──
    await page.getByText('Contacts', { exact: true }).first().click();
    await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Technical Contact' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Product Update Contact' })).toBeVisible();
    await page.fill('#techFirstName', 'Tech');
    await page.fill('#techLastName', 'Support');
    await page.fill('#techEmail', 'tech@acme.com');
    await page.fill('#techPhone', '555-000-0001');
    // Use same as technical
    await page.getByText('Same as Technical Contact').click();
    await page.getByText('Save & Return to Checklist').click();

    // Back on hub, check progress
    await expect(page.getByText('Program Managed Details')).toBeVisible();
  });
});

test.describe('Path B: PO + Private', () => {
  test('Phase 2 shows correct sections (no financial docs)', async ({ page }) => {
    await page.goto(BASE);
    await fillPhase1(page, { serviceType: 'po', companyType: 'Private' });

    await expect(page.getByText('Processor Only Details')).toBeVisible();
    // Should have: Business Details 2, Control Persons, Beneficial Owners, Contacts
    await expect(page.getByText('Additional Business Details')).toBeVisible();
    await expect(page.getByText('Control Persons')).toBeVisible();
    await expect(page.getByText('Beneficial Owners')).toBeVisible();
    await expect(page.getByText('Contacts', { exact: true }).first()).toBeVisible();
    // Should NOT have Financial Documents
    await expect(page.getByText('Financial Documents')).not.toBeVisible();
  });

  test('person details shows minimal fields (no citizenship, DOB, address)', async ({ page }) => {
    await page.goto(BASE);
    await fillPhase1(page, { serviceType: 'po', companyType: 'Private' });

    // Add a control person and check fields
    await page.getByText('Control Persons').click();
    await page.getByText('Add Control Person').click();
    await page.getByText('Fill In Details').click();

    await expect(page.getByRole('heading', { name: 'Control Person Details' })).toBeVisible();
    // Should NOT show citizenship, DOB, address fields
    await expect(page.getByText('Citizenship Status')).not.toBeVisible();
    await expect(page.locator('#pdDob')).not.toBeVisible();
    await expect(page.locator('#pdAddress')).not.toBeVisible();
    await expect(page.locator('#pdOwnership')).not.toBeVisible();
    // Should show: country, name, phone, email, title
    await expect(page.locator('#pdCountry')).toBeVisible();
    await expect(page.locator('#pdFirstName')).toBeVisible();
    await expect(page.locator('#pdLastName')).toBeVisible();
    await expect(page.locator('#pdPhone')).toBeVisible();
    await expect(page.locator('#pdEmail')).toBeVisible();
    await expect(page.locator('#pdTitle')).toBeVisible();
  });
});

test.describe('Path C: Public', () => {
  test('Phase 2 shows authorized signer (no CP/UBO)', async ({ page }) => {
    await page.goto(BASE);
    await fillPhase1(page, { serviceType: 'pm', companyType: 'Public' });

    await expect(page.getByText('Public Company Details')).toBeVisible();
    // Should have: Business Details 2, Authorized Signer, Contacts
    await expect(page.getByText('Additional Business Details')).toBeVisible();
    await expect(page.getByText('Authorized Signer')).toBeVisible();
    await expect(page.getByText('Contacts', { exact: true }).first()).toBeVisible();
    // Should NOT have CP, UBO, or Financial Docs
    await expect(page.getByText('Control Persons')).not.toBeVisible();
    await expect(page.getByText('Beneficial Owners')).not.toBeVisible();
    await expect(page.getByText('Financial Documents')).not.toBeVisible();
  });

  test('Business Details 2 only shows employee count + NAICS for public', async ({ page }) => {
    await page.goto(BASE);
    await fillPhase1(page, { serviceType: 'pm', companyType: 'Public' });

    await page.getByText('Additional Business Details').click();
    await expect(page.getByRole('heading', { name: 'Additional Business Details' })).toBeVisible();
    // Should NOT show address fields
    await expect(page.locator('#bd2Country')).not.toBeVisible();
    await expect(page.locator('#bd2Street')).not.toBeVisible();
    // Should show employee count + NAICS
    await expect(page.locator('#bd2Employees')).toBeVisible();
    await expect(page.locator('#bd2Naics')).toBeVisible();
  });

  test('authorized signer shows correct fields (no ownership, citizenship)', async ({ page }) => {
    await page.goto(BASE);
    await fillPhase1(page, { serviceType: 'po', companyType: 'Public' });

    await page.getByText('Authorized Signer').click();
    await page.getByText('Add Authorized Signer').click();
    await page.getByText('Fill In Details').click();

    await expect(page.getByRole('heading', { name: 'Authorized Signer Details' })).toBeVisible();
    // Should show: country, name, DOB, address, phone, email, title
    await expect(page.locator('#pdCountry')).toBeVisible();
    await expect(page.locator('#pdFirstName')).toBeVisible();
    await expect(page.locator('#pdDob')).toBeVisible();
    await expect(page.locator('#pdAddress')).toBeVisible();
    await expect(page.locator('#pdPhone')).toBeVisible();
    await expect(page.locator('#pdEmail')).toBeVisible();
    await expect(page.locator('#pdTitle')).toBeVisible();
    // Should NOT show: ownership, citizenship
    await expect(page.locator('#pdOwnership')).not.toBeVisible();
    await expect(page.getByText('Citizenship Status')).not.toBeVisible();
  });
});

test.describe('Other company type', () => {
  test('follows Private path', async ({ page }) => {
    await page.goto(BASE);
    await fillPhase1(page, { serviceType: 'pm', companyType: 'Other' });
    // Should be PM-Private path
    await expect(page.getByText('Program Managed Details')).toBeVisible();
    await expect(page.getByText('Control Persons')).toBeVisible();
    await expect(page.getByText('Beneficial Owners')).toBeVisible();
    await expect(page.getByText('Financial Documents')).toBeVisible();
  });
});
