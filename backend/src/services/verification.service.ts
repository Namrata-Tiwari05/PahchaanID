import db from "@/lib/db";
import type { GovIdType } from "@/generated/prisma/client";

/**
 * Service to handle query-based identity verification against the GovIdRecord master registry
 */
export class VerificationService {
  /**
   * Queries the GovIdRecord table for a matching idType and idNumber.
   * Returns the matched GovIdRecord if found, otherwise returns null.
   */
  static async verifyIdentity(idType: GovIdType, idNumber: string) {
    try {
      const record = await db.govIdRecord.findFirst({
        where: {
          idType,
          idNumber,
        },
      });
      return record;
    } catch (error) {
      console.error(`VerificationService.verifyIdentity error for ${idType} (${idNumber}):`, error);
      throw error;
    }
  }
}
